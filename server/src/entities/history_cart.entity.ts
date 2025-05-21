


import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { History } from "./history.entity";
import { Products } from "./products.entity";
import { UserCart } from "./user_cart.entity";
import { MethodHistory } from "src/history_cart/history_cart.dto";
export enum StateHistory {
    RECEIVED = 'Đã nhận ✅',
    DELIVERING = 'Đang giao hàng 🚚',
    CONFIRMING = 'Đang xác nhận hàng 👨‍💻'

}


@Entity('history_cart')
export class HistoryCart {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @ManyToOne(() => History, (history) => history.historyCart)
    @JoinColumn({ name: 'historyId' })
    history: History
    @Column()
    historyId: string;
    @Column()
    state: StateHistory
    @OneToMany(() => UserCart,(userCart)=>userCart.historyCart,{cascade:true,eager:true})
    @JoinColumn({ name: 'userCart_id' })
    userCart: UserCart[];
    @Column()
    address: string
    @Column()
    phone: string
    @Column()
    total: string
    @Column({default:MethodHistory.COD})
    method:MethodHistory
    @Column()
    create_at:Date
    @Column({default:null,nullable:true})
    received_at:Date
}