import { NextFunction, Request, Response } from "express";
import fileUpload = require("express-fileupload");

// declare module 'express' {
//     interface Request {
//         files?: Generator<any, fileUpload.FileArray>
//     }
// }
export default class Files {

    public nextAction = async (request: Request, response: Response, next: NextFunction) => {
        next();
    }

}