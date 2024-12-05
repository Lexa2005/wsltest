import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Places} from "./Places";
import {Roadmaps} from "./Roadmaps";
import {Interests} from "./Interests";

@Entity()
export class Image {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column({
        nullable: true
    })
    admin_id: string

    @Column({
        nullable: true
    })
    user_id: string

    @ManyToOne(() => Places, (places) => places.image)
    places_id: number

    @ManyToOne(() => Roadmaps, (roadmap) => roadmap.image)
    roadmap_id: number

    @ManyToOne(() => Interests, (interests) => interests.image)
    interests_id: number

    @Column()
    created: string

    @Column()
    updated: string
}