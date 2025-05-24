import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default:0})
  amount: number;
  @Column({default:0})
  amountVND:number
  @Column({ default: 'pending' })
  status: 'pending' | 'paid' | 'failed';

  @Column({ nullable: true })
  stripeSessionId: string;
}