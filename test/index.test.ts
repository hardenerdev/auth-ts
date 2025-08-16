import request from 'supertest';
import { app } from '../src/app';

describe("GET /", () => {
    it("returns status code 200", async () => {
        const response = await request(app)
            .get("/")
            .expect(200);
    });
});

describe("GET /{*splat}", () => {
    it("returns status code 404", async () => {
        const response = await request(app)
            .get("/random")
            .expect(404);
    });
});
