import { UserModel } from "../models/mongoose/user";
import { UserPublic } from "../models/userinterfaces";
import { UserDAO } from "../daos/userdao";
import { connect } from "../database/mongo/mongo";
import { userRouter } from "../routes/user.route";

export class MongoService extends UserDAO {
    connectDatabase(): void {
        connect();
    }

    async addUser(user: object): Promise<UserPublic> {
        try {
            const newUser = new UserModel(user);
            const result = await newUser.save();
            const userPublic: UserPublic = {
                name: newUser.name,
                email: newUser.email,
            };
            return userPublic;
        } catch (e) {
            throw e;
        }
    }

    async getUser(email: string): Promise<UserPublic> {
        const user = await UserModel.findOne({ email: email });
        
        if (!user) {
            throw new Error('user not found');
        } else {
            const userPublic: UserPublic = {
                name: user.name,
                email: user.email,
            };

            return userPublic;
        }
    }

    // abstract updateUser(): UserPublic;
    // abstract deleteUser(): UserPublic;

    // abstract login(): UserPublic;
    // abstract logout(): UserPublic;
    // abstract logoutAll(): UserPublic;
}
