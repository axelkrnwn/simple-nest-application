import { ClassStudent } from "src/model/class-students/entities/class-student.entity";
export declare class User {
    id: string;
    username: string;
    email: string;
    role: string;
    address: string;
    password: string;
    isDeleted: boolean;
    classes: ClassStudent[];
}
