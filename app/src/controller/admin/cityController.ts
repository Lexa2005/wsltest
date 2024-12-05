import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../../configs/data-source";
import {City} from "../../entity/City";
import {Image} from "../../entity/Image";
import {Roadmaps} from "../../entity/Roadmaps";
import {Places} from "../../entity/Places";
import {Interests} from "../../entity/Interests";

export default class CityController {

    private roadmapRepository = AppDataSource.getRepository(Roadmaps);
    private cityRepository = AppDataSource.getRepository(City);
    private placesRepository = AppDataSource.getRepository(Places);
    private imageRepository = AppDataSource.getRepository(Image);
    private interestsRepository = AppDataSource.getRepository(Interests);

    public indexAction = async (request: Request, response: Response, next: NextFunction) => {
        const city = await this.cityRepository.find();
        response.render("adminVue", {city: JSON.stringify(city), roadmap: JSON.stringify(null)});
    }

    public deleteAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.redirect(`/admin/error`);
            return
        }

        const id = Number(request.params.param);
        const cityToRemove = await this.cityRepository.findOne({
            where: {
                id: id
            },
            relations: {
                roadmaps: {
                    places: {
                        image: true
                    },
                    image: true
                },
                interests: {
                    image: true
                }
            }
        });
        // console.log(cityToRemove);
        let imgToRm: Image[] = [];
        let placeToRm: Places[] = [];

        // todo - Вытягиваем картинки из мест интереса
        cityToRemove.interests.forEach((item) => {
            imgToRm = [...imgToRm, ...item.image];
        });

        // todo - Вытягиваем картинки из мест roadmap
        cityToRemove.roadmaps.forEach((item) => {
            imgToRm = [...imgToRm, ...item.image];
            item.places.forEach((item) => {
                imgToRm = [...imgToRm, ...item.image];
            })
            placeToRm = [...placeToRm, ...item.places];
        });

        // console.log(cityToRemove.roadmaps, cityToRemove.interests, placeToRm, imgToRm);
        // console.log(placeToRm);
        await this.imageRepository.remove(imgToRm);
        await this.placesRepository.remove(placeToRm);
        await this.roadmapRepository.remove(cityToRemove.roadmaps);
        await this.interestsRepository.remove(cityToRemove.interests);

        await this.cityRepository.remove(cityToRemove);

        response.redirect(`/admin/city`);
    }

    public createAction = async (request: Request, response: Response, next: NextFunction) => {
        const city = await this.cityRepository.find();
        if (request.method === "POST") {
            const {name, description, status} = request.body;

            const validator = await this.cityRepository.findOneBy({
                name: name
            });
            if (validator !== null) {
                response.redirect(`/admin/error`);
                return
            }
            const newCity = Object.assign(new City(), {
                admin_id: 0,
                name: name,
                description: description,
                status: status === "active" ? 1 : 0,
                updated: new Date(),
                created: new Date()
            });
            await this.cityRepository.save(newCity);

            response.redirect(`/admin/city`);
            return;
        }

        response.render("adminVue", {city: JSON.stringify(city), roadmap: JSON.stringify(null)});
    }

    public editAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method === "POST") {
            const {name, description, status} = request.body;
            const cityEdit = await this.cityRepository.findOneBy({
                id: Number(request.params.param),
            });
            if (cityEdit == null) {
                response.redirect(`/admin/error`);
                return
            }
            cityEdit.name = name;
            cityEdit.description = description;
            cityEdit.status = status == "active" ? 1 : 0;
            cityEdit.updated = String(new Date());
            await this.cityRepository.save(cityEdit);
        };

        const city = await this.cityRepository.findOne({
            relations: {
                // @ts-ignore
                roadmaps: {
                    places: true,
                    image: true
                }
            },
            where: {
                id: Number(request.params.param)
            }
        });

        if (city == null) {
            response.redirect(`/admin/error`);
            return
        };

        response.render("adminCity", {
            suggestion: JSON.stringify(null),
            city: JSON.stringify(city)
        });
    }

}