import {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../../../configs/data-source";
import {Admin} from "../../../entity/Admin";

export default class AdminController {

    private adminRepository = AppDataSource.getRepository(Admin);

    public indexAction = async (request: Request, response: Response, next: NextFunction) => {

    }

    /**
     * POST /admin/auth
     * @summary Authorization
     * @tags admin
     * @param {AdminAuthRequest} request.body - name param description - application/json
     * @return {string} 200 - song response
     */
    public authAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJsonDie(403);
            return;
        }

        if (request.session.key) {
            response.redirect(`/admin`);
            return;
        }

        const {phone, password} = request.body;

        if (!phone || !password) {
            response.errorJsonDie(401);
            return;
        }

        const admin = await this.adminRepository.findOneBy({
            phone: phone,
            password: password
        });

        if (admin !== null) {
            request.session.key = String(request.sessionID);
            response.redirect(`/admin`);
            return;
        } else {
            response.errorJsonDie(401, undefined);
            return;
        }
    }

    /**
     * POST /admin/login
     * @summary Registration
     * @tags admin
     * @param {AdminLoginRequest} request.body - name param description - application/json
     * @return {string} 200 - song response
     */
    public loginAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJson(403);
            return;
        }

        const {phone, password, confirmPassword} = request.body;

        if (!phone || !password || !confirmPassword) {
            response.errorJson(401);
            return;
        }

        const validator = await this.adminRepository.findOne({
            where: {
                phone: phone
            }
        });

        if (validator !== null) {
             response.successJson(200, validator);
             return;
        }

        if (password !== confirmPassword) {
             response.errorJson(401);
             return;
        }


        const admin = Object.assign(new Admin(), {
            status: 1,
            phone: phone,
            password: password,
        });

        if (admin) {
            request.session.key = String(request.sessionID);
        }

        response.successJson(200, await this.adminRepository.save(admin));
    }

    /**
     * POST /admin/logout
     * @summary Logout
     * @tags admin
     * @param {string} request.body - newer - application/json
     * @return {string} 200 - song response
     */
    public logoutAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJson(403);
            return;
        }

        if (!request.session.key){
            response.redirect(`/admin/auth`);
        } else {
            request.session.key = null;
            response.redirect(`/admin/auth`)
        }
    }

    /**
     * PATCH /admin/edit
     * @summary Logout
     * @tags admin
     * @param {string} request.body - newer - application/json
     * @return {string} 200 - song response
     */
    public editAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "PATCH") {
            response.errorJson(403);
            return;
        }

        if (!request.session.key){
            response.redirect(`/admin/auth`);
        } else {
            request.session.key = null;
            response.redirect(`/admin/auth`)
        }
    }

}