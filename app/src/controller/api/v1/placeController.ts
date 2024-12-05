import {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../../../configs/data-source";
import {Roadmaps} from "../../../entity/Roadmaps";
import {Places} from "../../../entity/Places";

export default class RoadmapController {

    private roadmapRepository = AppDataSource.getRepository(Roadmaps);
    private placeRepository = AppDataSource.getRepository(Places);


    /**
     * POST /place/create
     * @summary Create a new city
     * @tags place
     * @param {PlaceCreateRequest} request.body - name param description - application/json
     * @return {string} 200 - song response
     */
    public createAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJsonDie(403);
            return;
        }
        const {admin_id, city_id, roadmap_id, title, description, comment, status, image, sound, location_info, latitude, longitude} = request.body;


        if (admin_id == null || city_id == null || roadmap_id == null || title == null || description == null || comment == null || status == null || image == null || sound == null || location_info == null || latitude == null || longitude == null) {
            console.log(request.body);
            response.errorJsonDie(401);
            return;
        }

        const validator = await this.roadmapRepository.findOneBy({
            id: roadmap_id
        })

        if (validator === null) {
            response.errorJsonDie(401, {error: "Roadmap || City not found"});
            return;
        }

        const place = Object.assign(new Places(), {
            admin_id: 0,
            city_id: validator.city_id,
            roadmap_id: roadmap_id,
            title: title,
            description: description,
            comment: comment,
            status: 0,
            image: "ref",
            sound: "ref",
            location_info: null,
            latitude: latitude,
            longitude: longitude,
            updated: new Date(),
            created: new Date()
        });

        const newPlace = await this.placeRepository.save(place);

        if (newPlace === null) {
            response.errorJsonDie(500);
            return;
        } else {
            response.successJson(200, newPlace);
            return;
        }

    }

}