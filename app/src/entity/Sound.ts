import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Places} from "./Places";

@Entity()
export class Sound {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column({
        nullable: true
    })
    admin_id: string

    // @ManyToOne(() => Places, (places) => places.sound)
    // places_id: number

    @Column()
    created: string

    @Column()
    updated: string
}