import { NextFunction, Request, Response } from "express";

export default class Controller {

    public indexAction = async (request: Request, response: Response, next: NextFunction) => {
        response.render('index', { title: 'api | Kanto' });
    }

}