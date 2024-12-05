import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {Places} from "./Places";
import {Interests} from "./Interests";
import {Roadmaps} from "./Roadmaps";

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    admin_id?: number

    @OneToMany(() => Places, (places) => places.city_id)
    places: Places[]

    @OneToMany(() => Interests, (interests) => interests.city_id)
    interests: Interests[]

    @OneToMany(() => Roadmaps, (roadmaps) => roadmaps.city_id)
    roadmaps: Roadmaps[]

    @Column()
    name?: string

    @Column()
    description?: string

    @Column()
    status?: number

    @Column({
        nullable: true
    })
    image?: string

    @Column()
    created: string

    @Column()
    updated: string

}
