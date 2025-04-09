import { Assignment } from "src/model/assignments/entities/assignment.entity";
import { User } from "src/model/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'submissions'})
export class Submission {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    file:string;

    @Column({ nullable: true })
    feedback: string;

    @Column({ nullable: true })
    score: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;
    
    @ManyToOne(() => Assignment)
    @JoinColumn()
    assignment: Assignment;

}
