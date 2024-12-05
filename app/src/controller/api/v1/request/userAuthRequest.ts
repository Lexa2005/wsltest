import {Request} from "express";

/**
 * UserAuthRequest model
 * @typedef {object} UserAuthRequest
 * @property {string} phone - phone number
 */

export default class UserAuthRequest {

    public validator = async (Request: Request): Promise<boolean | Request> => {
        const valid: boolean = false;

        return Request
    }

}