import { NextFunction, Request, Response } from "express";
import Controller from "./Controller";
import {AppDataSource} from "../../../configs/data-source";
import {City} from "../../../entity/City";
import {Places} from "../../../entity/Places";
import {Roadmaps} from "../../../entity/Roadmaps";

export default class SearchController  extends Controller  {

    private cityRepository = AppDataSource.getRepository(City);
    private placeRepository = AppDataSource.getRepository(Places);
    private roadmapRepository = AppDataSource.getRepository(Roadmaps);

    /**
     * POST /search
     * @summary Search возвращает город по названию
     * @tags search
     * @return {object} 200 - success response - application/json
     * @param {SearchRequest} request.body - name param description - application/json
     * @return {object} 400 - Bad request response
     */
    public indexAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJsonDie(401);
            return;
        }
        const {city} = request.body;

        const search = await this.cityRepository.findOne({
            where: {
                name: city,
                status: 1
            },
            relations: {
                interests: {
                    image: true,
                    // @ts-ignore
                    //created: false
                },
                roadmaps: {
                    places: {
                        image: true,
                    },
                    image: true
                }
            },
            select: {
                // name: true,
                // description: true,
                // status: true
            }
        })

        response.successJson(200, search);
    }

    /**
     * POST/search/place
     * @summary This is the summary of the endpoint
     * @tags search
     * @return {object} 200 - success response - application/json
     * @param {string} name.query - name param description - application/json
     * @return {object} 400 - Bad request response
     */
    public placeAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJsonDie(401);
            return;
        }

        const citys = await this.cityRepository.find({
            relations: {
                roadmaps: {
                    places: {
                        image: true
                    },
                    image: true
                }
            }
        })

        response.successJson(200, citys);
    }

}