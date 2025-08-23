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

export const loginUser = async (req: Request, res: Response) => {
    try {
        const [user, token] = await mongoService.loginUser(req.body);
        const userPublic = user.publicInformation();
        res.status(200).send({ userPublic, token });
    } catch (e) {
        res.status(500).send();
    }
};

export const logoutUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const user = await mongoService.logoutUser(req.user as User, req.token);
        const userPublic = user.publicInformation();
        res.status(200).send({ userPublic });
    } catch (e) {
        res.status(500).send();
    }
};
