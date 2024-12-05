import {City} from "../../entity/City";
import {Places} from "../../entity/Places";
import {AppDataSource} from "../../configs/data-source";
import {NextFunction, Request, Response} from "express";


export default class SearchController {

    private cityRepository = AppDataSource.getRepository(City);
    private placesRepository = AppDataSource.getRepository(Places);

    async indexAction(request: Request, response: Response, next: NextFunction) {
        response.render('index', {title: 'Kantolina | Kanto'});
    }

    public all = async (request: Request, response: Response, next: NextFunction) => {
        // return this.cityRepository.findOne({
        //     where: {
        //         id: 6
        //     },
        //     relations: {
        //         places: true
        //     }
        // })

        return this.cityRepository.find({
            relations: {
                places: true
            }
        });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const city_id = parseInt(request.params.id);
        const place = Object.assign(new Places(), {
            admin_id: 0,
            city_id: city_id,
            roadmap_id: 0,
            titile: "string",
            description: "string",
            comment: "string",
            status: 0,
            image: "string",
            sound: "string",
            location_info: "string",
            lantitude: 0,
            longitude: 0,
            created: String(new Date()),
            updated: String(new Date()),
        })

        return this.placesRepository.save(place);
    }

    //
    // async save(request: Request, response: Response, next: NextFunction) {
    //     const { firstName, lastName, age } = request.body;
    //
    //     const user = Object.assign(new User(), {
    //         firstName,
    //         lastName,
    //         age
    //     })
    //
    //     return this.userRepository.save(user)
    // }
    //
    // async remove(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)
    //
    //     let userToRemove = await this.userRepository.findOneBy({ id })
    //
    //     if (!userToRemove) {
    //         return "this user not exist"
    //     }
    //
    //     await this.userRepository.remove(userToRemove)
    //
    //     return "user has been removed"
    // }

}