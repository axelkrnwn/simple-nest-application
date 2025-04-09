import { Course } from "src/model/courses/entities/courses.entity";
import { Submission } from "src/model/submissions/entities/submission.entity";
export declare class Assignment {
    id: string;
    title: string;
    description: string;
    attachment: string;
    deadline: Date;
    course: Course;
    submissions: Submission[];
}
