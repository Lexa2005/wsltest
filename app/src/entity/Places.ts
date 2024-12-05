import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany} from "typeorm"
import {City} from "./City";
import {Roadmaps} from "./Roadmaps";
import {Image} from "./Image";
import {Sound} from "./Sound";

@Entity()
export class Places {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => City, (city) => city.places)
    city_id: number

    @Column()
    admin_id: number

    @ManyToOne(() => Roadmaps, (roadmaps) => roadmaps.places)
    roadmap_id: number

    // @ManyToMany(() => UserProgress, (user_progress) => user_progress.place_id)
    // user_progress: number

    // @ManyToMany(() => UserFavorite, (user_favorite) => user_favorite.place_id)
    // user_favorite: number

    @OneToMany(() => Image, (image) => image.places_id)
    image: Image[]

    @Column({
        nullable: true
    })
    sound: string

    // todo - Решить этот кал-говна!!!
    // @OneToMany(() => Sound, (sound) => sound.places_id)
    // sound: Sound[]

    @Column()
    title: string

    @Column()
    description: string

    @Column({
        nullable: true
    })
    comment: string

    @Column()
    status: number

    @Column({
        nullable: true
    })
    location_info: string

    @Column({
        type: "float"
    })
    latitude: string

    @Column({
        type: "float"
    })
    longitude: string

    @Column()
    updated: string

    @Column()
    created: string

}
