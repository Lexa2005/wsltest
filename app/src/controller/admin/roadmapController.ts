import { NextFunction, Request, Response } from "express";
import {AppDataSource} from "../../configs/data-source";
import {Roadmaps} from "../../entity/Roadmaps";
import {City} from "../../entity/City";
import {Image} from "../../entity/Image";
import crypto = require('crypto');
import {Places} from "../../entity/Places";

export default class RoadmapController {
    private roadmapRepository = AppDataSource.getRepository(Roadmaps);
    private cityRepository = AppDataSource.getRepository(City);
    private placesRepository = AppDataSource.getRepository(Places);
    private imageRepository = AppDataSource.getRepository(Image);

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
        const roadmap = await this.roadmapRepository.findOne({
            relations: {
                // @ts-ignore
                places: {
                    image: true
                },
                image: true
            },
            where: {
                id: Number(request.params.param)
            }
        });
        let imgToRm: Image[] = [];
        roadmap.places.forEach((item) => {
            imgToRm = [...imgToRm, ...item.image];
        });
        imgToRm.push(...roadmap.image);
        console.log(imgToRm);

        await this.imageRepository.remove(imgToRm);
        await this.placesRepository.remove(roadmap.places);
        await this.roadmapRepository.remove(roadmap);

        response.redirect(`/admin/roadmap`);
    }

    public editAction = async (request: Request, response: Response, next: NextFunction) => {
        const suggestion = await this.cityRepository.find({
            select: {
                name: true
            },
        });

        if (request.method == "POST") {
            const {title, description, city_id, status} = request.body;
            let validator: City = await this.cityRepository.findOneBy({
                name: city_id
            });
            if (validator == null) {
                response.redirect(`/admin/error`);
                return
            }

            const roadmapEdit = await this.roadmapRepository.findOneBy({
                id: Number(request.params.param),
                city_id: validator.id
            });
            if (roadmapEdit  == null) {
                response.redirect(`/admin/error`);
                return
            }
            roadmapEdit.city_id = validator.id;
            roadmapEdit.title = title;
            roadmapEdit.description = description;
            roadmapEdit.status = status == "active" ? 1 : 0;
            roadmapEdit.updated = String(new Date());
            await this.roadmapRepository.save(roadmapEdit);

            this.fileLoader(request, roadmapEdit.id);

        };

        const roadmap = await this.roadmapRepository.findOne({
            relations: {
                // @ts-ignore
                city_id: true,
                places: true,
                image: true
            },
            where: {
                id: Number(request.params.param)
            }
        });

        if (roadmap == null) {
            response.redirect(`/admin/error`);
            return
        };

        response.render("adminRoadmapEdit", {
            suggestion: JSON.stringify(suggestion),
            roadmap: JSON.stringify(roadmap)
        });
    }

    public createAction = async (request: Request, response: Response, next: NextFunction) => {
        const suggestion = await this.cityRepository.find({
            select: {
                name: true
            },
        });

        if (request.method == "POST") {
            const {title, description, city_id, status} = request.body;
            console.log(request.files);
            console.log(request.body);
            const validator = await this.cityRepository.findOneBy({
                name: city_id
            });
            if (validator == null) {
                response.redirect(`/admin`);
                return
            }
            const newRoadmap = Object.assign(new Roadmaps(), {
                admin_id: 0,
                city_id: validator.id,
                title: title,
                description: description,
                status: status === "active" ? 1 : 0,
                sound: "",
                updated: new Date(),
                created: new Date()
            });
            await this.roadmapRepository.save(newRoadmap);
            if (request.files != null) {
                console.log(request.files);
                const fileArray = Object.keys(request.files);

                fileArray.forEach((item) =>  {
                    const file = request.files[item];
                    const id = crypto.randomBytes(20).toString("hex");
                    const url: string = `/file_storage/image/${id}${file["name"]}`
                    const newImage = Object.assign(new Image(), {
                        url: url,
                        roadmap_id: newRoadmap.id,
                        created: new Date(),
                        updated: new Date()
                    });

                    this.imageRepository.save(newImage);

                    // @ts-ignore
                    file.mv('public/file_storage/image/'+id+file.name);
                })
                response.redirect(`/admin/roadmap/edit/${newRoadmap.id}`);

            };
        } else {
            response.render("adminRoadmapCreate", {suggestion: JSON.stringify(suggestion)});
        }
    }

    private fileLoader = (request: Request, roadmap_id: number) => {
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
                        roadmap_id: roadmap_id,
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
                    roadmap_id: roadmap_id,
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