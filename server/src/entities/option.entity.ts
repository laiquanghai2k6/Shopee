import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductOptions } from "./product_options.entity";


@Entity('option')
export class Option{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @ManyToOne(()=>ProductOptions,(productOptions)=>productOptions.options)
    productOptions:ProductOptions
    @Column()
    name:string


}
