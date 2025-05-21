import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vouncher } from "./vouncher.entity";
import { User } from "./user.entity";

export enum StateVouncher{
    USED='used',
    UNUSED='unused'
}

@Entity('user_vouncher')
export class UserVouncher  {
    @PrimaryGeneratedColumn('uuid')
    id:string
    @ManyToOne(()=>Vouncher)
     @JoinColumn({name:'vouncherId'})
    vouncher:Vouncher
    @ManyToOne(()=>User,user=>user.userVouncher)
    @JoinColumn({name:'userId'})
    user:User
    @Column({default:StateVouncher.UNUSED})
    state:StateVouncher
}