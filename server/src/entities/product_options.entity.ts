import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";
import { Option } from "./option.entity";

@Entity('product_options')
export class ProductOptions{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @ManyToOne(()=>Products,(product)=>product.productOptions)
    product:Products
    @Column()
    name:string
    @OneToMany(()=>Option,(option)=>option.productOptions,{cascade:true,eager:true})
    options:Option[]
}