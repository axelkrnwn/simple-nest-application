import { Assignment } from "src/model/assignments/entities/assignment.entity";
import { User } from "src/model/users/entities/users.entity";
export declare class Submission {
    id: string;
    file: string;
    feedback: string;
    score: number;
    user: User;
    assignment: Assignment;
}
