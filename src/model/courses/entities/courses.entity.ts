import { User } from "src/model/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'courses'})
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    image: string;
    
    @ManyToOne(() => User)
    @JoinColumn()
    teacher: User;
}