import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Products } from "./products.entity";
import { HistoryCart } from "./history_cart.entity";

export enum UserCartType{
    PENDING='pending',
    FINISH='finish'
}

@Entity('user_cart')
export class UserCart{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @ManyToOne(()=>User,(user)=>user.cart)
    @JoinColumn({name:'userId'})
    user:User
    @Column()
    userId:string
    @ManyToOne(()=>Products, { onDelete: 'CASCADE' })
    @JoinColumn({name:'product_id'})
    product:Products
    @ManyToOne(()=>HistoryCart,{
        nullable:true
    })
    @JoinColumn({name:'historyCart_id'})
    historyCart:HistoryCart
    @Column({default:0})
    quantity:number
    @Column()
    choosedOption:string
    @Column()
    priceProduct:string
    @Column()
    priceDiscount:string
    @Column({default:UserCartType.PENDING})
    type:UserCartType
    
}