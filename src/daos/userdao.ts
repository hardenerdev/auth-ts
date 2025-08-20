import {
    UserPublic
} from "../models/userinterfaces";

export abstract class UserDAO {
    abstract connectDatabase(): void;

    abstract addUser(user: object): Promise<UserPublic>;
    abstract getUser(email: string): Promise<UserPublic>;
    // abstract updateUser(): UserPublic;
    // abstract deleteUser(): UserPublic;

    // abstract login(): UserPublic;
    // abstract logout(): UserPublic;
    // abstract logoutAll(): UserPublic;
}