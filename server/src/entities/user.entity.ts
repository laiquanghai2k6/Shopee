import { Exclude } from "class-transformer";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserCart } from "./user_cart.entity";
import { Address } from "./address.entity";
import { Vouncher } from "./vouncher.entity";
export enum Role{
    client='client',
    admin='admin'
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique:true})
    email:string

    @Exclude({toPlainOnly:true})
    @Column({ type: 'varchar', nullable: true })
    password:string|null

    @Column({default:''})
    image:string

    
    @OneToMany(()=>UserCart,(userCart)=>userCart.user)
    cart:UserCart[]
    @OneToMany(()=>Address,(address)=>address.user)
    address:Address[]
    @ManyToMany(()=>Vouncher)
    @JoinTable({ name: 'user_voucher' })
    vouncher:Vouncher[]
    @Column({default:Role.client})
    role:string
    
}