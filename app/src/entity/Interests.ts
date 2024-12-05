import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {City} from "./City";
import {Image} from "./Image";

@Entity()
export class Interests {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => City, (city) => city.interests)
    city_id: number

    @Column()
    admin_id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: number

    @OneToMany(() => Image, (image) => image.interests_id)
    image: Image[]

    @Column({
        nullable: true
    })
    location_info: string

    @Column({
        type: "float"
    })
    latitude: string

    @Column({
        type: "float"
    })
    longitude: string

    @Column()
    updated: string

    @Column()
    created: string
}