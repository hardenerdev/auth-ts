import express from 'express';
import {
    addUser,
    getUser,
    updateUser
} from '../controllers/user.controller';
import { checkAuthentication } from '../middleware/authentication.middleware';

export const userRouter = express.Router();

userRouter.post("/users", addUser);
// @ts-ignore
userRouter.get("/users/user", checkAuthentication, getUser);
// @ts-ignore
userRouter.patch("/users/user", checkAuthentication, updateUser);
