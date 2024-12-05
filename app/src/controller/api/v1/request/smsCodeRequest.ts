import {Request} from "express";

/**
 * SmsCodeRequest model
 * @typedef {object} SmsCodeRequest
 * @property {string} phone - phone number
 * @property {string} smsCode - smsCode
 */

export default class SmsCodeRequest {

    public validator = async (Request: Request): Promise<boolean | Request> => {
        const valid: boolean = false;

        return Request
    }

}