import {
    NextFunction,
    Response
} from "express"
import jwt from 'jsonwebtoken';
import jwtConfig from "../config/jwt.config";
import { MongoService } from "../services/user.service";
import { ExtendedRequest } from "../models/apiinterface";

const mongoService = new MongoService();

export const checkAuthentication = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decodedJwt = jwt.verify(token, jwtConfig.secret) as jwt.JwtPayload;
        const user = await mongoService.getUser(decodedJwt, token);

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'no authenticated'});
    }
};