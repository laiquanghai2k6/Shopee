import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserCart } from "./user_cart.entity";
import { User } from "./user.entity";
import { HistoryCart } from "./history_cart.entity";



@Entity('history')
export class History{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @OneToOne(()=>User,user=>user.history,)
    user:User
    @OneToMany(()=>HistoryCart,(cart)=>cart.history)
    historyCart:HistoryCart[]
    
}