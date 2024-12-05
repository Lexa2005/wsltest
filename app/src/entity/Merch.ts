import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {City} from "./City";
import {Image} from "./Image";
import {Warehouse} from "./Warehouse";

@Entity()
export class Merch {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    admin_id: number

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.merch_id)
    warehouse_id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: number

    @OneToMany(() => Image, (image) => image.interests_id)
    image: Image[]

    @Column()
    price: number

    @Column()
    count: number

    @Column()
    updated: string

    @Column()
    created: string
}