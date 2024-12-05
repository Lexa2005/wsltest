import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserProgress} from "./UserProgress";
import {UserFavorite} from "./UserFavorite";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: true
    })
    name?: string

    @Column({
        nullable: true
    })
    login?: string

    // @OneToMany(() => UserProgress, (user_progress) => user_progress.user_id)
    // user_progress: UserProgress[]

    @ManyToMany(() => UserFavorite, (user_favorite) => user_favorite.user_id)
    user_favorite: UserFavorite[]

    @Column({
        nullable: true
    })
    auth_code?: string

    @Column({
        nullable: true
    })
    avatar?: string

    @Column({
        nullable: true
    })
    bio?: string

    @Column({
        unique: true
    })
    phone: string

    @Column({
        nullable: true
    })
    smsCode: number

    @Column({
        unique: true
    })
    token: string

    @Column({
        nullable: true
    })
    email?: string

    @Column()
    status?: 0 | 1

    @Column({
        nullable: true
    })
    created: string

    @Column({
        nullable: true
    })
    updated: string
}