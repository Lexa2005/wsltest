import {Request} from "express";

/**
 * RoadmapCreateRequest model
 * @typedef {object} RoadmapCreateRequest
 * @property {number} admin_id - ID Admin
 * @property {number} city_id - City name
 * @property {string} title - title
 * @property {string} description - description
 * @property {number} status - status
 * @property {string} image - image
 * @property {string} sound - sound
 */

export default class RoadmapCreateRequest {

    public validator = async (Request: Request): Promise<boolean | Request> => {
        const valid: boolean = false;

        return Request
    }

}