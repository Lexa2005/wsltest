import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../configs/data-source";
import {Admin} from "../entity/Admin";

declare module 'express' {
    interface Request {
        admin?: Admin,
    }
}
export default class PrivateRoute {
    private adminRepository = AppDataSource.getRepository(Admin);

    public nextAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.url.includes(`admin`) && !request.session.key && !(request.url.includes(`auth`) || request.url.includes(`login`))) {
            response.redirect(`/admin/auth`);
            return;
        } else if (request.url.includes(`admin`) && request.session.key) {

        }

        next();
    }

}