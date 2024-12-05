import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../../configs/data-source";
import {Roadmaps} from "../../entity/Roadmaps";
import {City} from "../../entity/City";
import {Image} from "../../entity/Image";
import crypto = require('crypto');
import {Places} from "../../entity/Places";
import {Sound} from "../../entity/Sound";

export default class PlaceController {
    private roadmapRepository = AppDataSource.getRepository(Roadmaps);
    private cityRepository = AppDataSource.getRepository(City);
    private placesRepository = AppDataSource.getRepository(Places);
    private imageRepository = AppDataSource.getRepository(Image);
    private soundRepository = AppDataSource.getRepository(Sound);

    public indexAction = async (request: Request, response: Response, next: NextFunction) => {
        const roadmap = await this.roadmapRepository.find({
            relations: {
                places: true,
                image: true,
                // @ts-ignore
                city_id: true
            }
        });
        response.render("adminVue", {city: JSON.stringify(null) ,roadmap: JSON.stringify(roadmap)});
    }

    public deleteAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.redirect(`/admin/error`);
            return
        }

        const id = Number(request.params.param);
        const placeToRm = await this.placesRepository.findOne({
            relations: {
                image: true
            },
            where: {
                id: Number(request.params.param)
            }
        });

        await this.imageRepository.remove(placeToRm.image);
        await this.placesRepository.remove(placeToRm);

        response.redirect(`/admin/roadmap`);
    }

    public editAction = async (request: Request, response: Response, next: NextFunction) => {
        const suggestion = await this.roadmapRepository.find({
            select: {
                title: true
            },
        });

        const place = await this.placesRepository.findOne({
            relations: {
                // @ts-ignore
                image: true
            },
            where: {
                id: Number(request.params.param)
            }
        })
        if (request.method == "POST") {
            const {title, description, roadmap_id, status, latitude, longitude} = request.body;
            let validator: Roadmaps = await this.roadmapRepository.findOneBy({
                title: roadmap_id
            });
            if (validator == null) {
                response.redirect(`/admin/error`);
                return
            }

            const placeEdit = await this.placesRepository.findOneBy({
                id: Number(request.params.param),
                roadmap_id: validator.id
            });
            if (placeEdit  == null) {
                response.redirect(`/admin/error`);
                return
            }
            placeEdit.roadmap_id = validator.id;
            placeEdit.title = title;
            placeEdit.description = description;
            placeEdit.status = status == "active" ? 1 : 0;
            placeEdit.latitude = latitude;
            placeEdit.longitude = longitude;
            placeEdit.updated = String(new Date());
            placeEdit.sound = this.soundLoader(request, placeEdit.id);

            await this.placesRepository.save(placeEdit);

            this.fileLoader(request, placeEdit.id);
        };

        const places = await this.placesRepository.findOne({
            relations: {
                image: true,
                // @ts-ignore
                roadmap_id: true
            },
            where: {
                id: Number(request.params.param)
            }
        });

        if (places == null) {
            response.redirect(`/admin/error`);
            return
        };

        response.render("adminRoadmapEdit", {
            suggestion: JSON.stringify(suggestion),
            roadmap: JSON.stringify(places)
        });
    }

    public createAction = async (request: Request, response: Response, next: NextFunction) => {
        const suggestion = await this.roadmapRepository.find({
            select: {
                title: true
            },
        });
        console.log(request.files);
        console.log(request.body);
        if (request.method == "POST") {
            const {title, description, roadmap_id, status, latitude, longitude} = request.body;

            const validator = await this.roadmapRepository.findOneBy({
                title: roadmap_id
            });
            if (validator == null) {
                response.redirect(`/admin/error`);
                return
            }
            const newPlace = Object.assign(new Places(), {
                admin_id: 0,
                city_id: validator.city_id,
                roadmap_id: validator.id,
                title: title,
                description: description,
                status: status === "active" ? 1 : 0,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                sound: "",
                updated: new Date(),
                created: new Date()
            });
            // todo - Кал дерьма (Переписать!!!)

            newPlace.sound = this.soundLoader(request, newPlace.id);
            await this.placesRepository.save(newPlace);


            if (request.files != null) {
                const id = crypto.randomBytes(20).toString("hex");
                const files = request.files["image"];

                // @ts-ignore
                if (files instanceof Array) {
                    const fileArray = [];

                    // @ts-ignore
                    files.forEach((item): any => {
                        const url: string = `/file_storage/image/${id}${item["name"]}`
                        const newImage = Object.assign(new Image(), {
                            url: url,
                            places_id: newPlace.id,
                            created: new Date(),
                            updated: new Date()
                        });

                        const image = this.imageRepository.save(newImage);
                        // @ts-ignore
                        item.mv('public/file_storage/image/'+id+item.name);
                        fileArray.push(image);
                    });
                } else {
                    const url: string = `/file_storage/image/${id}${files["name"]}`
                    const newImage = Object.assign(new Image(), {
                        url: url,
                        places_id: newPlace.id,
                        created: new Date(),
                        updated: new Date()
                    });

                    const image = this.imageRepository.save(newImage);
                    // @ts-ignore
                    files.mv('public/file_storage/image/'+id+files.name);

                }


            };
            response.redirect(`/admin/roadmap`)
        } else {
            response.render("adminRoadmapCreate", {suggestion: JSON.stringify(suggestion)});
        }
    }

    private soundLoader = (request: Request, places_id: number) => {
        if (request.files['sound'] != null) {
            const salt = crypto.randomBytes(20).toString("hex");
            const files = request.files["sound"];

            const url: string = `/file_storage/sound/${salt}${files["name"]}`
            const newSound = Object.assign(new Sound(), {
                url: url,
                admin_id: 0,
                // places_id: places_id,
                created: new Date(),
                updated: new Date()
            });

            this.soundRepository.save(newSound);
            // @ts-ignore
            files.mv('public/file_storage/sound/'+salt+files.name);
            //@ts-ignore
            return `/file_storage/sound/`+salt+files.name
        } else {
            return ``
        }
    }

    private fileLoader = (request: Request, places_id: number) => {
        if (request.files['image'] != null) {
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
                        places_id: places_id,
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
                    places_id: places_id,
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