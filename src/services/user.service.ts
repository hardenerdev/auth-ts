import { UserModel } from "../models/mongoose/user";
import { UserPublic } from "../models/userinterfaces";
import { UserDAO } from "../daos/userdao";
import { connect } from "../database/mongo/mongo";

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
}
