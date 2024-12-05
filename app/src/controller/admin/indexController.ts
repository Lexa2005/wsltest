import { NextFunction, Request, Response } from "express";

export default class Controller {

    public indexAction = async (request: Request, response: Response, next: NextFunction) => {
        // if (!request.session.key)
        //     response.redirect(`/admin/login`);
        response.render("adminVue", {city: JSON.stringify(null), roadmap: JSON.stringify(null)});
    }

}