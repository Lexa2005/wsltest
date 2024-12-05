import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Logs {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url?: string

    @Column()
    method?: string

    @Column()
    hostname?: string

    @Column()
    ip?: string

    @Column()
    query?: string

    @Column()
    created: string
}
