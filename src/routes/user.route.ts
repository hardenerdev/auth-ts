import express from 'express';
import {
    addUser,
    getUser
} from '../controllers/user.controller';
import { checkAuthentication } from '../middleware/authentication';

export const userRouter = express.Router();

userRouter.post("/users", addUser);
// @ts-ignore
userRouter.get("/users/user", checkAuthentication, getUser);
