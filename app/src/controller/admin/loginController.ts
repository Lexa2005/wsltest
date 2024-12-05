import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../../configs/data-source";
import {Admin} from "../../entity/Admin";

export default class LoginController {
    private adminRepository = AppDataSource.getRepository(Admin);

    public indexAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method == "POST") {
            const {phone, password, confirm_password} = request.body;
            if (password !== confirm_password) {
                response.render("error");
                return
            }

            const admin = await this.adminRepository.findOneBy({
                phone: phone,
                password: password
            });

            if (admin !== null) {
                response.render("error", {
                    city: JSON.stringify(null),
                    roadmap: JSON.stringify(null)
                });
                return;
            }

            request.session.key = request.sessionID;
            const newAdmin = Object.assign(new Admin(), {
                status: 1,
                token: request.session.key,
                phone: phone,
                password: password,
                create: new Date(),
                updated: new Date()
            })

            await this.adminRepository.save(newAdmin);
            request.admin = newAdmin;

            response.redirect(`/admin`);
            return
        }

        response.render("adminVue", {
            city: JSON.stringify(null),
            roadmap: JSON.stringify(null)
        });
    }

}