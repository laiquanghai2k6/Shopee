import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserCart } from "./user_cart.entity";
import { Vouncher } from "./vouncher.entity";
import { History } from "./history.entity";
import { UserVouncher } from "./user_vouncher";
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
    @Column({default:0})
    money:number
    @OneToMany(()=>UserVouncher,(userVouncher)=>userVouncher.user,{cascade:true})
    userVouncher:UserVouncher[]
    @Column({default:Role.client})
    role:string
    @OneToOne(()=>History,{ cascade: true, eager: true })
    @JoinColumn({ name: 'history_id' })
    history:History
    
}