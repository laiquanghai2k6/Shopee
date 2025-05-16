import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Products } from "./products.entity";
import { Address } from "./address.entity";



@Entity('user_cart')
export class UserCart{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @ManyToOne(()=>User,(user)=>user.cart)
    @JoinColumn({name:'user_id'})
    user:User
    @ManyToOne(()=>Products, { onDelete: 'CASCADE' })
    @JoinColumn({name:'product_id'})
    product:Products
    @Column({default:0})
    quantity:number
    
}