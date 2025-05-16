import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";



@Entity('vouncher')
export class Vouncher{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({ nullable: false, default: '' })
    discount:string
    @Column()
    expire:Date
    @Column({ nullable: false, default: '' })
    maxDiscount:string
 
}