import {NextFunction, Request, Response} from "express";
import crypto = require('crypto');
import {AppDataSource} from "../../../configs/data-source";
import {Image} from "../../../entity/Image";

export default class RoadmapController {
    private imageRepository = AppDataSource.getRepository(Image);

    /**
     * POST /file/upload
     * @summary Create a new city
     * @tags file
     * @param {} request.body - name param description - multipart/form-data
     * @return {string} 200 - song response
     */
    public uploadAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJsonDie(403);
            return;
        }
        if (request.files != null) {
            const fileArray = Object.keys(request.files);
            fileArray.forEach(item => {
                const file = request.files[item];
                console.log(file)
                // @ts-ignore
                const id = crypto.randomBytes(20).toString("hex");
                // @ts-ignore
                file.mv('public/file_storage/image/'+id+file.name);
            })
        }
        console.log(request.body);

    }

    /**
     * POST /file/uploadImage
     * @summary Create a new city
     * @tags file
     * @param {} request.body - name param description - multipart/form-data
     * @return {string} 200 - song response
     */
    public uploadImageAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJsonDie(403);
            return;
        }
        console.log(request.files);
        if (request.files != null) {
            const {roadmap_id} = request.body;
            const fileArray = Object.keys(request.files);
            const resArray = [];

            fileArray.forEach(async (item) =>  {
                const file = request.files[item];
                const id = crypto.randomBytes(20).toString("hex");
                const url: string = `/file_storage/image/${id}${file["name"]}`
                const newImage = Object.assign(new Image(), {
                    url: url,
                    roadmap_id: 5,
                    created: new Date(),
                    updated: new Date()
                });

                const image = await this.imageRepository.save(newImage);
                resArray.push(image);

                // @ts-ignore
                file.mv('public/file_storage/image/'+id+file.name);
            })
            response.successJson(200, resArray);

        };


    }

    /**
     * POST /file/uploadSound
     * @summary Create a new city
     * @tags file
     * @param {} request.body - name param description - multipart/form-data
     * @return {string} 200 - song response
     */
    public uploadSoundAction = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method !== "POST") {
            response.errorJsonDie(403);
            return;
        }
        const {city_id} = request.body;
        const fileArray = Object.keys(request.files);
        fileArray.forEach(item => {
            const file = request.files[item];
            console.log(file)
            // @ts-ignore
            const id = crypto.randomBytes(20).toString("hex");
            // @ts-ignore
            file.mv('public/file_storage/sound/'+id+file.name);
        })
        console.log(request.body);
        // console.log(typeof request.files);
        // // @ts-ignore
        // request.files.file.mv('public/file_storage/'+request.files.file.name);

        // const file: UploadedFile = request.files;
        // request.files.undefined.mv('public/pics/'+req.files.photo.name)
        // request.files.photo.mv('public/pics/'+request.files.photo.name);
        // request.end(request.files.photo.name);

    }

}