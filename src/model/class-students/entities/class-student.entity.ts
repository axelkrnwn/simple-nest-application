import { Course } from "src/model/courses/entities/courses.entity";
import { User } from "src/model/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:"class-students"})
export class ClassStudent {

    @PrimaryColumn()
    studentId: string;

    @PrimaryColumn()
    courseId: string;

    @Column()
    enrollmentDate: Date;

    @Column({default:0})
    progress: number;

    @ManyToOne(() => User)
    @JoinColumn()
    student: User;

    @ManyToOne(() => Course)
    @JoinColumn()
    course: Course;
}
