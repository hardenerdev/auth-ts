import mongoose from "mongoose";
import mongoConfig from "../../config/mongo.config";

export const connect = async () => {
    try {
        await mongoose.connect(mongoConfig.url);
        console.log(`connected to mongo instance`);
    } catch (e) {
        console.log(`error while connecting mongoose ${e}`);
    }
};
