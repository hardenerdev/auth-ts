import express from 'express';
import { addUser } from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.post("/users", addUser);
