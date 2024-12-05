import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Merch} from "./Merch";

@Entity()
export class Warehouse {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    admin_id: number

    @OneToMany(() => Merch, (merch) => merch.warehouse_id)
    merch_id: number

    @Column()
    name: string

    @Column({
        type: "float"
    })
    latitude: string

    @Column({
        type: "float"
    })
    longitude: string

    @Column({
        nullable: true
    })
    created: string

    @Column({
        nullable: true
    })
    updated: string
}