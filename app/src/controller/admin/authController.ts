import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../../configs/data-source";
import {Admin} from "../../entity/Admin";

export default class AuthController {
    private adminRepository = AppDataSource.getRepository(Admin);

    public indexAction = async (request: Request, response: Response, next: NextFunction) => {

        if (request.method == "POST") {
            const {phone, password, confirm_password} = request.body;
            const admin = await this.adminRepository.findOneBy({
                phone: phone,
                password: password
            });
            if (admin == null) {
                response.render("adminVue", {
                    city: JSON.stringify(null),
                    roadmap: JSON.stringify(null)
                });
                return;
            }
            request.session.key = request.sessionID;
            admin.token = request.session.key;
            request.admin = admin;

            await this.adminRepository.save(admin);

            response.redirect(`/admin`);
            return
        }

        response.render("adminVue", {
            city: JSON.stringify(null),
            roadmap: JSON.stringify(null)
        });
    }

}