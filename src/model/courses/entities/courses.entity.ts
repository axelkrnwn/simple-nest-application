import { Assignment } from "src/model/assignments/entities/assignment.entity";
import { CourseDetail } from "src/model/course-details/entities/course-detail.entity";
import { User } from "src/model/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Assignment, assignment => assignment.course)
    @JoinColumn()
    assignments:Assignment[]

    @OneToMany(() => CourseDetail, courseDetail => courseDetail.course)
    @JoinColumn()
    courseDetails: CourseDetail[]

}