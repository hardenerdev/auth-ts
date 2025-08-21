import jwt from 'jsonwebtoken';
import { UserModel } from "../models/mongoose/user";
import { UserPublic } from "../models/userinterfaces";
import { UserDAO } from "../daos/userdao";
import { connect } from "../database/mongo/mongo";
import { Login } from "../models/logininterfaces";

export class MongoService extends UserDAO {
    connectDatabase(): void {
        connect();
    }

    async addUser(user: object): Promise<Login> {
        try {
            const newUser = new UserModel(user);
            const result = await newUser.save();
            const token = await result.generateToken();
            const userPublic: UserPublic = {
                name: newUser.name,
                email: newUser.email,
            };
            
            return {
                user: userPublic, token
            };
        } catch (e) {
            throw e;
        }
    }

    async getUser(decoded: jwt.JwtPayload, token: string): Promise<UserPublic> {
        try {
            const user = await UserModel.findOne({
                _id: decoded._id, 'tokens.token': token
            });
            
            if (!user) {
                throw new Error('user not found');
            } else {
                const userPublic: UserPublic = {
                    name: user.name,
                    email: user.email,
                };

                return userPublic;
            }
        } catch (e) {
            throw e;
        }
    }

    // abstract updateUser(): UserPublic;
    // abstract deleteUser(): UserPublic;

    // abstract login(): UserPublic;
    // abstract logout(): UserPublic;
    // abstract logoutAll(): UserPublic;
}
