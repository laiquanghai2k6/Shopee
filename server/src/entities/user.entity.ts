import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
    
}