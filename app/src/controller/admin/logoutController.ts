import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../../configs/data-source";
import {Admin} from "../../entity/Admin";

export default class LoginController {
    private adminRepository = AppDataSource.getRepository(Admin);

    public indexAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method == "POST") {
            request.admin = null;
            request.session.destroy(() => {

            })
            response.redirect(`/admin/auth`);
            return
        }

        response.render("adminVue", {
            city: JSON.stringify(null),
            roadmap: JSON.stringify(null)
        });
    }

}