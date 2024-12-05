import {Request} from "express";

/**
 * AdminLoginRequest model
 * @typedef {object} AdminLoginRequest
 * @property {string} phone - login phone
 * @property {string} password - password
 * @property {string} confirmPassword - confirm password
 */

export default class AdminLoginRequest {

    phone: string

    password: string

    confirmPassword: string

    public validator = async (Request: Request): Promise<boolean | Request> => {
        const valid: boolean = false;

        return Request
    }

}