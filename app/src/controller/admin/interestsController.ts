import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../../configs/data-source";
import {City} from "../../entity/City";
import {Interests} from "../../entity/Interests";
import {Image} from "../../entity/Image";
import crypto = require('crypto');

export default class CityController {
    private cityRepository = AppDataSource.getRepository(City);
    private interestsRepository = AppDataSource.getRepository(Interests);
    private imageRepository = AppDataSource.getRepository(Image);

    public indexAction = async (request: Request, response: Response, next: NextFunction) => {
        const city = await this.cityRepository.find();
        const interests = await this.interestsRepository.find({
            relations: {
                // @ts-ignore
                city_id: true,
                // @ts-ignore
                image: true,
            }
        })

        response.render("adminInterests", {suggestion: JSON.stringify(city), interests: JSON.stringify(interests)});
    }

    public deleteAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.redirect(`/admin/error`);
            return
        }

        const id = Number(request.params.param);
        const placeToRemove = await this.interestsRepository.findOneBy({
            id: id
        });
        await this.interestsRepository.remove(placeToRemove);

        response.redirect(`/admin/interests`);
    }

    public createAction = async (request: Request, response: Response, next: NextFunction) => {
        const city = await this.cityRepository.find();
        if (request.method === "POST") {
            const {title, description, status, city_id, latitude, longitude} = request.body;
            console.log(request.body);
            const city = await this.cityRepository.findOneBy({
                name: city_id
            });

            const validator = await this.interestsRepository.findOneBy({
                title: title
            });
            if (validator !== null || city === null) {
                response.redirect(`/admin/error`);
                return
            }
            const newInterests = Object.assign(new Interests(), {
                city_id: city.id,
                admin_id: 0,
                title: title,
                description: description,
                status: status === "active" ? 1 : 0,
                latitude: latitude,
                longitude: longitude,
                updated: new Date(),
                created: new Date()
            });
            await this.interestsRepository.save(newInterests);

            this.fileLoader(request, newInterests.id);

            response.redirect(`/admin/interests`);
            return;
        }

        response.render("adminInterests", {suggestion: JSON.stringify(city), interests: JSON.stringify(null)});
    }

    public editAction = async (request: Request, response: Response, next: NextFunction) => {
        const id = Number(request.params.param);

        if (request.method === "POST") {
            const {title, description, status, latitude, longitude, city_id} = request.body;

            const validator = await this.cityRepository.findOne({
                where: {
                    name: city_id
                }
            })

            const interestsToEdit = await this.interestsRepository.findOneBy({
                id: Number(request.params.param),
            });
            if (validator == null || interestsToEdit == null) {
                response.redirect(`/admin/error`);
                return
            }
            interestsToEdit.title = title;
            interestsToEdit.description = description;
            interestsToEdit.city_id = validator.id;
            interestsToEdit.status = status == "active" ? 1 : 0;
            interestsToEdit.latitude = latitude;
            interestsToEdit.longitude = longitude;
            interestsToEdit.updated = String(new Date());
            await this.interestsRepository.save(interestsToEdit);

            this.fileLoader(request, interestsToEdit.id);
        };

        const interests = await this.interestsRepository.findOne({
            where: {
                id: id
            },
            relations: {
                image: true,
                //@ts-ignore
                city_id: true
            }
        })

        const suggestion = await this.cityRepository.find({
        });

        if (suggestion == null) {
            response.redirect(`/admin/error`);
            return
        };

        response.render("adminInterests", {
            suggestion: JSON.stringify(suggestion),
            interests: JSON.stringify(interests)
        });
    }

    private fileLoader = (request: Request, interests_id: number) => {
        if (request.files != null) {
            const salt = crypto.randomBytes(20).toString("hex");
            const files = request.files["image"];

            // @ts-ignore
            if (files instanceof Array) {
                const fileArray = [];

                // @ts-ignore
                files.forEach((item): any => {
                    const url: string = `/file_storage/image/${salt}${item["name"]}`
                    const newImage = Object.assign(new Image(), {
                        url: url,
                        interests_id: interests_id,
                        created: new Date(),
                        updated: new Date()
                    });

                    const image = this.imageRepository.save(newImage);
                    // @ts-ignore
                    item.mv('public/file_storage/image/'+salt+item.name);
                    fileArray.push(image);
                });
            } else {
                const url: string = `/file_storage/image/${salt}${files["name"]}`
                const newImage = Object.assign(new Image(), {
                    url: url,
                    interests_id: interests_id,
                    created: new Date(),
                    updated: new Date()
                });

                const image = this.imageRepository.save(newImage);
                // @ts-ignore
                files.mv('public/file_storage/image/'+salt+files.name);

            }


        };
    }

}