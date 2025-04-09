import { Course } from "src/model/courses/entities/courses.entity";
import { Submission } from "src/model/submissions/entities/submission.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "assignments"})
export class Assignment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;
    
    @Column()
    description: string;
    
    @Column()
    attachment: string;
    
    @Column()
    deadline: Date;

    @ManyToOne(() => Course, course => course.assignments, {cascade:true})
    @JoinColumn()
    course:Course

    @OneToMany(() => Submission, submission => submission.assignment, {cascade:true})
    @JoinColumn()
    submissions:Submission[]
    

}
