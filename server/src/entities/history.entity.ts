import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserCart } from "./user_cart.entity";

export enum StateHistory{
    RECEIVED = 'Đã nhận ✅',
    DELIVERING = 'Đang giao hàng 🚚',
    CONFIRMING = 'Đang xác nhận hàng 👨‍💻'

}

@Entity('history')
export class History{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @OneToOne(()=>UserCart)
    userCart:UserCart
    @Column()
    state:StateHistory
}