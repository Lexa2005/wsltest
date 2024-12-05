import {NextFunction, Request, Response} from "express";
import {AppDataSource} from "../../../configs/data-source";
import {City} from "../../../entity/City";

export default class CityController {

    private cityRepository = AppDataSource.getRepository(City);

    /**
     * GET /city
     * @summary Get all city from admin
     * @tags city
     * @param {AdminAuthRequest} request.body - name param description - application/json
     * @return {string} 200 - song response
     */
    public indexAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "GET") {
            response.errorJsonDie(403);
            return;
        }
        response.successJson(200, await this.cityRepository.find());
    }

    /**
     * PATCH /city/:id
     * @summary Edit city
     * @tags city
     * @param {AdminAuthRequest} request.body - name param description - application/json
     * @return {string} 200 - song response
     */
    public editAction = async (request: Request, response: Response, next: NextFunction) => {

    }

    /**
     * POST /city/create
     * @summary Create a new city
     * @tags city
     * @param {CityCreateRequest} request.body - name param description - application/json
     * @return {string} 200 - song response
     */
    public createAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJsonDie(403);
            return;
        }
        const {admin_id, name, description, status, image} = request.body;


        if (admin_id == null || name == null || description == null || status == null) {
            console.log(admin_id, name, description, status);
            response.errorJsonDie(401);
            return;
        }

        const validator = await this.cityRepository.findOneBy({
            name: name
        })

        if (validator !== null) {
            response.errorJsonDie(401, validator);
            return;
        }

        const city = Object.assign(new City(), {
            admin_id: admin_id,
            name: name,
            description: description,
            status: status,
            image: image,
            created: new Date(),
            updated: new Date()
        });
        const newCity = await this.cityRepository.save(city);

        if (newCity === null) {
            response.errorJsonDie(500);
            return;
        } else {
            response.successJson(200, newCity);
            return;
        }

    }

}