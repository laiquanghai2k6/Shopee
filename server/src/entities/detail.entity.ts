import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";


@Entity('detail')
export class Detail{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @ManyToOne(()=>Products,(product)=>product.detail,{onDelete:'CASCADE'})
    product:Products
    @Column()
    name:string
    @Column()
    value:string
}