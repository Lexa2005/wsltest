import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status?: 0 | 1 | 2

    @Column({
        nullable: true
    })
    name?: string

    @Column({
        nullable: true
    })
    avatar?: string

    @Column({
        nullable: true
    })
    token: string

    @Column({
        nullable: true
    })
    bio?: string

    @Column()
    phone: string

    @Column({
        nullable: true
    })
    email?: string

    @Column()
    password: string

    @Column({
        nullable: true
    })
    created: string

    @Column({
        nullable: true
    })
    updated: string
}