import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar'})
    name:string

    @Column({type:'varchar'})
    password:string

    @Column({type:'varchar'})
    username:string

    @Column({type:'varchar', unique:true})
    email:string

    @Column({type:'varchar', default: 'free'})
    subscription_type: string;

    @Column({ type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',})
    created_at:Date

    @Column({ type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',})
    updated_at:Date
}
