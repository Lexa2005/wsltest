import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Places} from "./Places";

@Entity()
export class UserFavorite {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => User, (user) => user.user_favorite)
    user_id: number

    // @ManyToMany(() => Places, (place) => place.user_favorite)
    // place_id: string

    @Column()
    status: number

    @Column()
    updated: string

    @Column()
    created: string


}