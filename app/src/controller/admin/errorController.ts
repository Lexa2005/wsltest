import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../../configs/data-source";
import {City} from "../../entity/City";

export default class ErrorController {
    private cityRepository = AppDataSource.getRepository(City);

    public indexAction = async (request: Request, response: Response, next: NextFunction) => {
        // if (!request.session.key)
        //     response.redirect(`/admin/login`);
        const city = await this.cityRepository.find();
        response.render("adminVue", {city: JSON.stringify(city), roadmap: JSON.stringify(null)});
    }
}