import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('banner')
export class Banner{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column()
    bgLogin:string
    @Column({type:'json'})
    bgNavigate:string[]
    @Column()
    bg1:string
    @Column()
    bg2:string
}