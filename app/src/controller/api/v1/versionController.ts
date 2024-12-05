import {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../../../configs/data-source";

export default class RoadmapController {


    /**
     * POST /version
     * @summary Create a new city
     * @tags version
     * @param {PlaceCreateRequest} request.body - name param description - application/json
     * @return {string} 200 - song response
     */
    public indexAction = async (request: Request, response: Response, next: NextFunction) => {

    }

}