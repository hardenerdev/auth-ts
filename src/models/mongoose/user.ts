import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import {
    User
} from '../userinterfaces';
import bcryptConfig from '../../config/bcrypt.config';

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

export const UserModel = mongoose.model('User', userSchema);
