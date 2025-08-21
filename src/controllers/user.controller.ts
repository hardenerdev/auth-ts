import { Request, Response } from "express";
import { MongoService } from "../services/user.service";
import { ExtendedRequest } from "../models/apiinterface";

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

export const getUser = async (req: ExtendedRequest, res: Response) => {
    try {
        // @todo validate input
        res.status(200).send(req.user);
    } catch (e) {
        res.status(404).send(e);
    }
};
