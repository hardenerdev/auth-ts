import { UserModel } from "../models/mongoose/user";
import { UserPublic } from "../models/userinterfaces";

export const storeUser = async (user: object) => {
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
};
