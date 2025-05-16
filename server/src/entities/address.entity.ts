import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity('address')
export class Address{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @ManyToOne(()=>User,(user)=>user.address)
    @JoinColumn({name:'user_id'})
    user:User
}