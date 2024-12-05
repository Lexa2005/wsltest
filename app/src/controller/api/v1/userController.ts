import { NextFunction, Request, Response } from "express";
import Controller from "./Controller";
import {AppDataSource} from "../../../configs/data-source";
import {City} from "../../../entity/City";
import {User} from "../../../entity/User";
import crypto = require('crypto');
import {randomInt} from "crypto";

export default class SearchController  extends Controller  {

    private cityRepository = AppDataSource.getRepository(City);
    private userRepository = AppDataSource.getRepository(User);


    /**
     * POST /user/auth
     * @summary This is the summary of the endpoint
     * @tags user
     * @return {object} 200 - success response - application/json
     * @param {UserAuthRequest} request.body - name param description - application/json
     * @return {object} 400 - Bad request response
     */
    public authAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJsonDie(401);
            return;
        }
        const {phone} = request.body;
        const validator = this.phoneValidator(phone);

        if (!validator) {
            response.errorJsonDie(401);
            return
        }

        let validUser = await this.userRepository.findOneBy({
            phone: validator
        });

        const salt = crypto.createHmac("sha256", phone, {
            encoding: "utf-8"
        }).digest("hex").toString();
        console.log(salt);

        if (validUser !== null) {
            validUser.smsCode = randomInt(1111, 9999);
            validUser.token = String(salt);
            await this.userRepository.save(validUser);
            response.successJson(200, {
                phone: validator,
                smsCode: validUser.smsCode
            });
            return;
        } else {
            validUser = Object.assign(new User(), {
                phone: validator,
                smsCode: randomInt(1111, 9999),
                token: String(salt),
                status: 1,
                created: String(new Date()),
                updated: String(new Date())
            });
            await this.userRepository.save(validUser);
            response.successJson(200, {
                phone: validator,
                smsCode: validUser.smsCode
            });
            return
        }
    }

    /**
     * POST /user/smsCode
     * @summary This is the summary of the endpoint
     * @tags user
     * @return {object} 200 - success response - application/json
     * @param {SmsCodeRequest} request.body - name param description - application/json
     * @return {object} 400 - Bad request response
     */
    public smsCodeAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJsonDie(401);
            return;
        }
        const {phone, smsCode} = request.body;
        const validator = this.phoneValidator(phone);

        if (!validator) {
            response.errorJsonDie(401);
            return
        }

        let validUser = await this.userRepository.findOneBy({
            phone: validator
        });

        if (validUser == null || validUser.smsCode != smsCode) {
            response.errorJsonDie(401);
            return
        }

        response.successJson(200, {
            token: validUser.token
        })
    }

    /**
     * POST /user/edit
     * @summary This is the summary of the endpoint
     * @tags user
     * @return {object} 200 - success response - application/json
     * @param {string} name.query - name param description - application/json
     * @return {object} 400 - Bad request response
     * @security BearerAuth
     */
    public editAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJsonDie(401);
            return;
        }

        const {name, bio, email} = request.body;
        const token = request.headers["x-ktt-token"].toString();

        const userEdit = await this.userRepository.findOneBy({
            token: token
        });
        if (userEdit == null) {
            response.errorJsonDie(403);
            return
        }

        userEdit.name = name;
        userEdit.bio = bio;
        userEdit.email = email;
        await this.userRepository.save(userEdit);

        response.successJson(200, {
            name: userEdit.name,
            bio: userEdit.bio,
            email: userEdit.email
        });
        return;
    }

    private phoneValidator = (phone: string) => {
        const regx: RegExp = /^\s?(\+\s?7|8)([- ()]*\d){10}$/;
        if (!regx.test(phone)) {
            return false;
        }
        if (phone[0] == "+"){
            phone = phone.replace("+7", "8");
        } else if (phone[0] !== "8") {
            return false
        }
        return phone;
    }

}