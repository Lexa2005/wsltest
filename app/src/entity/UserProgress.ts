import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Places} from "./Places";

@Entity()
export class UserProgress {
    @PrimaryGeneratedColumn()
    id: number

    // @ManyToOne(() => User, (user) => user.user_progress)
    // user_id: number

    // @ManyToOne(() => Places, (places) => places.user_progress)
    // place_id: number

    @Column()
    status: number

    @Column()
    data: string

    @Column()
    updated: string

    @Column()
    created: string
}