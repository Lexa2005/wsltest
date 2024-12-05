import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../configs/data-source";
import {Logs} from "../entity/Logs";

export default class Logger {

    private loggerRepository = AppDataSource.getRepository(Logs);

    public nextAction = async (request: Request, response: Response, next: NextFunction) => {
        const log = Object.assign(new Logs(), {
            url: request.url,
            method: request.method,
            hostname: request.hostname,
            ip: request.ip,
            query: request.query,
            created: new Date()
        })
        await this.loggerRepository.save(log);
        next();
    }

}