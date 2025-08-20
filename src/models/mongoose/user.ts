import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    User
} from '../userinterfaces';
import bcryptConfig from '../../config/bcrypt.config';
import jwtConfig from '../../config/jwt.config';

interface UserDocument extends User, mongoose.Document {};

const userSchema = new mongoose.Schema<UserDocument>({
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
        validate (value: string) {
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
userSchema.pre('save', async function(next) {
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
        { _id: user._id.toString()},
        jwtConfig.secret,
        { expiresIn: '2h' }
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

export const UserModel = mongoose.model('User', userSchema);
