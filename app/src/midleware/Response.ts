import { NextFunction, Request, Response } from "express";

declare module 'express' {
    interface Response {
        successJson: (statusCode: number, json: object) => any,
        errorJsonDie: (statusCode: number, json?: object) => any
        errorJson: (statusCode: number, json?: object) => any
    }
}
export default class ResponseJSON {

    public nextAction = async (request: Request, response: Response, next: NextFunction) => {

        response.successJson = (statusCode: number, json: object) => {
            response.setHeader("x-ktt-version", 0);
            response.status(statusCode);
            response.json({
                status: statusCode,
                techwork: false,
                response: json
            });
        }

        response.errorJsonDie = (statusCode: number, json: object = {}) => {
            response.setHeader("x-ktt-version", 0);
            response.status(statusCode);
            response.json({
                status: statusCode,
                techwork: false,
                response: json
            });
        }

        response.errorJson = (statusCode: number, json: object = {}) => {
            response.setHeader("x-ktt-version", 0);
            response.status(statusCode);
            response.json({
                status: statusCode,
                techwork: false,
                response: json
            });
        }

        next();
    }

}