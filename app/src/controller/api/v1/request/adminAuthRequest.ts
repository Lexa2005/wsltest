import {Request} from "express";

/**
 * AdminAuthRequest model
 * @typedef {object} AdminAuthRequest
 * @property {string} login - Admin login
 * @property {string} password - Admin password
 */

export default class AdminAuthRequest {

    login: string

    password: string

    public validator = async (Request: Request): Promise<boolean | Request> => {
        const valid: boolean = false;

        return Request
    }

}