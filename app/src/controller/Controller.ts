import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../configs/data-source";
import {Configuration} from "../entity/Configuration";

export default class Controller {
    private configurationRepository = AppDataSource.getRepository(Configuration);

    public indexAction = async (request: Request, response: Response, next: NextFunction) => {
        const config = await this.configurationRepository.findOne({
            where: {
                id: 1
            }
        });

        // response.render('index', { configuration: JSON.stringify(config) });
        response.render('React', { configuration: JSON.stringify(config) });
    }

}
