import { Course } from "src/model/courses/entities/courses.entity";
export declare class Assignment {
    id: string;
    title: string;
    description: string;
    attachment: string;
    deadline: Date;
    course: Course;
}
