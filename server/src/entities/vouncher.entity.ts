import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { UserVouncher } from "./user_vouncher";



@Entity('vouncher')
export class Vouncher{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({ nullable: false, default: '' })
    discount:string
    @Column()
    expire:Date
    @OneToMany(()=>UserVouncher,(userVouncher)=>userVouncher.vouncher,{cascade:true})
    userVouncher:UserVouncher[]
    @Column({ nullable: false, default: '' })
    maxDiscount:string
 
}