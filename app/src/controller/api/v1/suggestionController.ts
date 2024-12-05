import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../../../configs/data-source";
import {City} from "../../../entity/City";
import {Roadmaps} from "../../../entity/Roadmaps";

export default class SuggestionController {

    private cityRepository = AppDataSource.getRepository(City);
    private roadmapRepository = AppDataSource.getRepository(Roadmaps);

    /**
     * POST /suggestion/dictionary/{type}
     * @summary
     * @tags suggestion
     * @return {object} 200 - success response - application/json
     * @param {string} type.path - enum:city,roadmap - dictionary_type
     * @return {object} 401 - Bad request response
     */

    public dictionaryAction = async (request: Request, response: Response, next: NextFunction) => {
        let dictionary = [];

        switch (request.params.param) {
            case "roadmap":
                dictionary = await this.roadmapRepository.find({
                    select: {
                        title: true
                    }
                })
                break;
            case "city":
                dictionary = await this.cityRepository.find({
                    select: {
                        name: true
                    }
                })
                break;
            default:
                dictionary = null;
                break;
        }

        if (dictionary == null || request.method !== "POST") {
            response.errorJsonDie(401);
            return
        }

        response.successJson(200, dictionary);
    }


}