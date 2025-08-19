import { Request, Response } from "express";
import { storeUser } from "../services/user.service";

export const addUser = async (req: Request, res: Response) => {
    try {
        // @todo validate input
        const userPublic = await storeUser(req.body);
        res.status(200).send(userPublic);
    } catch (e) {
        res.status(404).send(e);
    }
};
