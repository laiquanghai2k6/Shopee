import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Products } from "./products.entity";



@Entity('product_response')
export class ProductResponse{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column()
    comment:string
    @Column()
    image:string
    @Column({default:0})
    star:number
    @ManyToOne(()=>User)
    @JoinColumn({name:'user_id'})
    user:User
    @ManyToOne(()=>Products,(product)=>product.response, { onDelete: 'CASCADE' })
    @JoinColumn({name:'product_id'})
    product:Products

}