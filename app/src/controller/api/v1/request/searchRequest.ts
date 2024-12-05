import {Request} from "express";

/**
 * SearchRequest model
 * @typedef {object} SearchRequest
 * @property {string} city - city
 */

export default class SearchRequest {

    public validator = async (Request: Request): Promise<boolean | Request> => {
        const valid: boolean = false;

        return Request
    }

}