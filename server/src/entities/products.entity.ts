import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductResponse } from "./product_response.entity";
import { Detail } from "./detail.entity";
import { ProductOptions } from "./product_options.entity";


@Entity('products')
export class Products{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column()
    type:string
    @Column()
    title:string
    @Column()
    description:string
    @Column({default:0})
    remain:string
    @Column({default:0})
    sold:number
    @Column()
    timeDiscount:Date
    @Column({default:0})
    discount:string
    @Column({default:0})
    price:string
    @Column()
    image:string
    @Column({default:0})
    starAvg:number
    @Column()
    created_at:Date
    @OneToMany(()=>ProductResponse,(response)=>response.product,{cascade:true,eager:true})
    response:ProductResponse[]
    @OneToMany(()=>Detail,(detail)=>detail.product,{cascade:true,eager:true})
    detail:Detail[]
    @OneToMany(()=>ProductOptions,(option)=>option.product,{cascade:true,eager:true})
    productOptions:ProductOptions[]
}