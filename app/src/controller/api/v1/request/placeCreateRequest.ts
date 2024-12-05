import {Request} from "express";

/**
 * PlaceCreateRequest model
 * @typedef {object} PlaceCreateRequest
 * @property {number} admin_id - ID Admin
 * @property {number} city_id - City name
 * @property {number} roadmap_id - roadmap name
 * @property {string} title - title
 * @property {string} comment - comment
 * @property {string} description - description
 * @property {number} status - status
 * @property {string} image - image
 * @property {string} sound - sound
 * @property {string} location_info - sound
 * @property {number} latitude - latitude
 * @property {number} longitude - longitude
 */

export default class PlaceCreateRequest {

    public validator = async (Request: Request): Promise<boolean | Request> => {
        const valid: boolean = false;

        return Request
    }

}