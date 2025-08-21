import jwt from 'jsonwebtoken';
import {
    User,
    UserPublic,
} from "../models/userinterfaces";
import { Login } from "../models/logininterfaces";

export abstract class UserDAO {
    abstract connectDatabase(): void;

    abstract addUser(user: object): Promise<Login>;
    abstract getUser(decoded: jwt.JwtPayload, token: string): Promise<UserPublic>;
    abstract updateUser(user: User, updates: object): Promise<UserPublic>;
    // abstract deleteUser(): UserPublic;

    // abstract login(): UserPublic;
    // abstract logout(): UserPublic;
    // abstract logoutAll(): UserPublic;
}