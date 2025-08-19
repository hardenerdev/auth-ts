import { UserDAO } from "../../userdao";
import { connect } from "../../../database/mongo/mongo";

export class MongoUserDAO extends UserDAO {
    connectDatabase(): void {
        connect();
    }
}
