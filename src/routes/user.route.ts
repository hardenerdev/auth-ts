import express from 'express';
import {
    addUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    logoutAllUser
} from '../controllers/user.controller';
import { checkAuthentication } from '../middleware/authentication.middleware';

export const userRouter = express.Router();

userRouter.post("/users", addUser);
// @ts-ignore
userRouter.get("/users/user", checkAuthentication, getUser);
// @ts-ignore
userRouter.patch("/users/user", checkAuthentication, updateUser);
// @ts-ignore
userRouter.delete("/users/user", checkAuthentication, deleteUser);
userRouter.post("/users/login", loginUser);
// @ts-ignore
userRouter.post("/users/logout", checkAuthentication, logoutUser);
// @ts-ignore
userRouter.post("/users/logoutAll", checkAuthentication, logoutAllUser);
