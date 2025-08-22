import mongoose, { Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    User
} from '../userinterfaces';
import bcryptConfig from '../../config/bcrypt.config';
import jwtConfig from '../../config/jwt.config';

interface UserDocument extends User, mongoose.Document { };
interface UserModelType extends Model<UserDocument> {
  findByCredentials(credentials: object): Promise<User>;
}

const userSchema = new mongoose.Schema<UserDocument, UserModelType>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value: string) {
            if (!validator.isEmail(value)) {
                throw Error("Email is not a valid email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
}, {
    timestamps: true,
});

/**
 * pre-save middleware to hash passworn
 */
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(
            user.password,
            Number(bcryptConfig.salt)
        );
    }

    next();
});

/**
 * instance method to generate an authentication jwt
 */
userSchema.methods.generateToken = async function () {
    const user = this;

    const token = jwt.sign(
        { _id: user._id.toString() },
        jwtConfig.secret,
        { expiresIn: '2h' }
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

/**
 * instance method to publish only public information
 */
userSchema.methods.publicInformation = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject._id;
    delete userObject.__v;
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.createdAt;
    delete userObject.updatedAt;

    return userObject;
};

userSchema.static('findByCredentials', async function findByCredentials(credentials): Promise<User> {
    const email = credentials.email;
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new Error('invalid email');
    }

    const passwordMatch = await bcrypt.compare(
        credentials.password,
        user.password
    );

    if (!passwordMatch) {
        throw new Error('invalid password');
    }

    return user;
})

export const UserModel = mongoose.model<UserDocument, UserModelType>('User', userSchema);
