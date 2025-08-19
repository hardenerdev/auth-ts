import mongoose from 'mongoose';
import validator from 'validator';
import {
    User
} from '../userinterfaces';

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

export const UserModel = mongoose.model('User', userSchema);
