import { Request, Response } from "express";
import { MongoService } from "../services/user.service";

const mongoService = new MongoService();

export const addUser = async (req: Request, res: Response) => {
    try {
        // @todo validate input
        const userPublic = await mongoService.addUser(req.body);
        res.status(200).send(userPublic);
    } catch (e) {
        res.status(404).send(e);
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        // @todo validate input
        const userPublic = await mongoService.getUser(req.body.email);
        res.status(200).send(userPublic);
    } catch (e) {
        res.status(404).send(e);
    }
};
