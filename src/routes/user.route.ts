import express from 'express';
import {
    addUser,
    getUser
} from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.post("/users", addUser);
userRouter.get("/users/user", getUser);
