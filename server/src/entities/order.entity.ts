import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;
  @Column()
  amountVND:number
  @Column({ default: 'pending' })
  status: 'pending' | 'paid' | 'failed';

  @Column({ nullable: true })
  stripeSessionId: string;
}