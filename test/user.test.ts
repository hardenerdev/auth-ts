import request from 'supertest';
import { app } from '../src/app';
import { UserModel } from '../src/models/mongoose/user';
import { User } from '../src/models/userinterfaces';

const newUser: User = {
    name: 'me',
    email: 'me@test.com',
    password: '1234567890',
}

beforeAll(async () => {
    await UserModel.deleteMany();
});

describe("POST /users", () => {
    it("should create new user", async () => {
        const response = await request(app)
            .post("/users")
            .send(newUser)
            .expect(200);
    });
});
