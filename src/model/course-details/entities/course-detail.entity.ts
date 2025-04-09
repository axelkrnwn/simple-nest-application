import { Course } from "src/model/courses/entities/courses.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"course-details"})
export class CourseDetail {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    attachment:string;
    
    @Column()
    createdDate:Date;

    @ManyToOne(() => Course, {cascade:true})
    @JoinColumn()
    course:Course;
}
