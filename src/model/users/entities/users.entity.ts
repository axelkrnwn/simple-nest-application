import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;
    @Column({unique:true})
    email: string;
    @Column()
    role: string;
    @Column()
    address: string;
    @Column()
    password: string;
}