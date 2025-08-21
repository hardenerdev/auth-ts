import { Request, Response } from "express";
import { MongoService } from "../services/user.service";
import { ExtendedRequest } from "../models/apiinterface";
import { User } from "../models/userinterfaces";

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
        const user = req.user as User;
        res.status(200).send(user.publicInformation());
    } catch (e) {
        res.status(404).send(e);
    }
};

export const updateUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const userPublic = await mongoService.updateUser(req.user as User, req.body);
        res.status(200).send(userPublic);
    } catch (e) {
        res.status(500).send();
    }
};

export const deleteUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const userPublic = await mongoService.deleteUser(req.user as User);
        res.status(200).send(userPublic);
    } catch (e) {
        res.status(500).send();
    }
};
