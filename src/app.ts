import express, { Request, Response } from 'express';

export const app = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
    res.status(200).send({ "hello": "friend" });
});

app.all("/{*splat}", (req: Request, res: Response, next) => {
    res.status(404).send();
});
