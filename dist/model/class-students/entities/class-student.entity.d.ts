import { Course } from "src/model/courses/entities/courses.entity";
import { User } from "src/model/users/entities/users.entity";
export declare class ClassStudent {
    studentId: string;
    courseId: string;
    enrollmentDate: Date;
    progress: number;
    student: User;
    course: Course;
}
