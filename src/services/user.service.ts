import jwt from 'jsonwebtoken';
import { UserModel } from "../models/mongoose/user";
import { User, UserPublic } from "../models/userinterfaces";
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

    async getUser(decoded: jwt.JwtPayload, token: string): Promise<User> {
        try {
            const user = await UserModel.findOne({
                _id: decoded._id, 'tokens.token': token
            });
            
            if (!user) {
                throw new Error('user not found');
            } else {
                return user;
            }
        } catch (e) {
            throw e;
        }
    }

    async updateUser(user: User, updates: object): Promise<UserPublic> {
        try {
            Object.keys(updates).forEach(update => {
                user[update as keyof User] = updates[update as keyof typeof updates];
            });
            const newUser = new UserModel(user);
            await newUser.save();

            const userPublic: UserPublic = {
                name: user.name,
                email: user.email,
            };

            return userPublic;
        } catch (e) {
            throw e;
        }
    }

    // abstract deleteUser(): UserPublic;

    // abstract login(): UserPublic;
    // abstract logout(): UserPublic;
    // abstract logoutAll(): UserPublic;
}
