import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  amount: number;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column({ default: 0 })
  amountVND: number
  @Column({ default: 'pending' })
  status: 'pending' | 'paid' | 'failed';
 @Column({ nullable: true })
  userId: string;
  @Column({ nullable: true })
  stripeSessionId: string;
}