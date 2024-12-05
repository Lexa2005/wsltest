import {Request} from "express";

/**
 * CityCreateRequest model
 * @typedef {object} CityCreateRequest
 * @property {number} admin_id - ID Admin
 * @property {string} name - City name
 * @property {string} description - description
 * @property {number} status - status
 * @property {object} images - images
 */

export default class CityCreateRequest {

    public validator = async (Request: Request): Promise<boolean | Request> => {
        const valid: boolean = false;

        return Request
    }

}