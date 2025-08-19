import {
    UserPublic
} from "../models/userinterfaces";

export abstract class UserDAO {
    abstract connectDatabase(): void;

    // abstract addUser(): UserPublic;
    // abstract getUser(): UserPublic;
    // abstract updateUser(): UserPublic;
    // abstract deleteUser(): UserPublic;

    // abstract login(): UserPublic;
    // abstract logout(): UserPublic;
    // abstract logoutAll(): UserPublic;
}