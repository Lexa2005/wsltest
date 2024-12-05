import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {City} from "./City";
import {Places} from "./Places";
import {Image} from "./Image";

@Entity()
export class Roadmaps {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    admin_id: number

    @OneToMany(() => Places, (places) => places.roadmap_id)
    places: Places[]

    @OneToMany(() => Image, (image) => image.roadmap_id)
    image: Image[]

    @ManyToOne(() => City, (city) => city.roadmaps)
    city_id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: number

    @Column()
    sound: string

    @Column()
    updated: string

    @Column()
    created: string
}