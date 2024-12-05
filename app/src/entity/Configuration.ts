import {Column, Entity, PrimaryColumn} from "typeorm";


@Entity()
export class Configuration {

    @PrimaryColumn()
    id: number

    @Column()
    admin_id: number

    @Column({
        nullable: true
    })
    version: string

    @Column({
        nullable: true
    })
    api_version: string

    @Column({
        nullable: true
    })
    android_app_link: string

    @Column({
        nullable: true
    })
    ios_app_link: string

    @Column({
        nullable: true
    })
    web_app_link: string

    @Column()
    create: string

    @Column()
    update: string
}