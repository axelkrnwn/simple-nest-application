import { Assignment } from "src/model/assignments/entities/assignment.entity";
import { CourseDetail } from "src/model/course-details/entities/course-detail.entity";
import { User } from "src/model/users/entities/users.entity";
export declare class Course {
    id: string;
    title: string;
    description: string;
    image: string;
    teacher: User;
    assignments: Assignment[];
    courseDetails: CourseDetail[];
}
