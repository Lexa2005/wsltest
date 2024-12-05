import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "mws_postgis",
    port: 5432,
    username: "mws_user",
    password: "3b2797efdd871707af524ba41b78bd22",
    database: "mws",
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
