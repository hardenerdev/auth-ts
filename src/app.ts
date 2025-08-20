import express, { Request, Response } from 'express';
import { userRouter } from './routes/user.route';
import { MongoService } from './services/user.service';

const mongoUserDAO = new MongoService();
mongoUserDAO.connectDatabase();

export const app = express();

app.use(express.json());
app.use(userRouter);

app.get("/", async (req: Request, res: Response) => {
    res.status(200).send({ "hello": "friend" });
});

app.all("/{*splat}", (req: Request, res: Response, next) => {
    res.status(404).send();
});
