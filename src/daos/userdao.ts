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
    abstract deleteUser(user: User): Promise<UserPublic>;
    abstract loginUser(user: any): Promise<[User, string]>;
    abstract logoutUser(user: User, token: string): Promise<User>;
    abstract logoutAllUser(user: User, token: string): Promise<User>;
}