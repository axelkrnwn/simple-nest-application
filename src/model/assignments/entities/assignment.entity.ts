import { Course } from "src/model/courses/entities/courses.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "assignments"})
export class Assignment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;
    
    @Column()
    description: string;
    
    @Column()
    deadline: Date;

    @ManyToOne(() => Course, course => course.assignments, {cascade:true})
    @JoinColumn()
    course:Course

}
