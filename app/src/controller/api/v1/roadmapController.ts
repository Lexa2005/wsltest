import {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../../../configs/data-source";
import {City} from "../../../entity/City";
import {Roadmaps} from "../../../entity/Roadmaps";

export default class RoadmapController {

    private cityRepository = AppDataSource.getRepository(City);
    private roadmapRepository = AppDataSource.getRepository(Roadmaps);

    /**
     * GET /roadmap
     * @summary Get all city from admin
     * @tags roadmap
     * @param {AdminAuthRequest} request.body - name param description - application/json
     * @return {string} 200 - song response
     */
    public indexAction = async (request: Request, response: Response, next: NextFunction) => {

    }

    /**
     * PATCH /roadmap/:id
     * @summary Edit city
     * @tags roadmap
     * @param {AdminAuthRequest} request.body - name param description - application/json
     * @return {string} 200 - song response
     */
    public editAction = async (request: Request, response: Response, next: NextFunction) => {

    }

    /**
     * POST /roadmap/create
     * @summary Create a new city
     * @tags roadmap
     * @param {RoadmapCreateRequest} request.body - name param description - application/json
     * @return {string} 200 - song response
     */
    public createAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJsonDie(403);
            return;
        }
        const {admin_id, city_id, title, description, status, image, sound} = request.body;


        if (admin_id == null || city_id == null || title == null || description == null || image == null || sound == null) {
            console.log(request.body);
            response.errorJsonDie(401);
            return;
        }

        const validator = await this.cityRepository.findOneBy({
            id: city_id
        })

        if (validator === null) {
            response.errorJsonDie(401, {error: "City not found"});
            return;
        }

        const roadmap = Object.assign(new Roadmaps(), {
            admin_id: 0,
            city_id: city_id,
            title: title,
            description: description,
            status: 0,
            image: [],
            sound: "ref",
            updated: new Date(),
            created: new Date()
        });

        const newRoadmap = await this.roadmapRepository.save(roadmap);

        if (newRoadmap === null) {
            response.errorJsonDie(500);
            return;
        } else {
            response.successJson(200, newRoadmap);
            return;
        }

    }

}