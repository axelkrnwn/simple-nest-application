import { User } from "src/model/users/entities/users.entity";
export declare class Course {
    id: string;
    title: string;
    description: string;
    image: string;
    teacher: User;
}
