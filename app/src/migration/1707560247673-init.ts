import { MigrationInterface, QueryRunner } from "typeorm";
import {AppDataSource} from "../configs/data-source";
import {Configuration} from "../entity/Configuration";

export class Init1707560247673 implements MigrationInterface {
    private configurationRepository = AppDataSource.getRepository(Configuration);

    public async up(queryRunner: QueryRunner): Promise<void> {
        const config = Object.assign(new Configuration(), {
            id: 0,
            admin_id: 0,
            version: "0.0.1",
            api_version: "0.1.0",
            android_app_link: "/",
            ios_app_link: "/",
            web_app_link: "/",
            create: new Date(),
            update: new Date()
        });

        await this.configurationRepository.save(config);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
