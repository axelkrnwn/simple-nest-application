import { ClassStudentsService } from './class-students.service';
import { CreateClassStudentDto } from './dto/create-class-student.dto';
import { UpdateClassStudentDto } from './dto/update-class-student.dto';
import { Request } from 'express';
export declare class ClassStudentsController {
    private readonly classStudentsService;
    constructor(classStudentsService: ClassStudentsService);
    create(request: Request, createClassStudentDto: CreateClassStudentDto): Promise<import("./entities/class-student.entity").ClassStudent>;
    findByUser(request: Request): Promise<import("./entities/class-student.entity").ClassStudent[]>;
    findByCourse(id: string): Promise<import("./entities/class-student.entity").ClassStudent[]>;
    update(id: string, updateClassStudentDto: UpdateClassStudentDto): Promise<import("./entities/class-student.entity").ClassStudent>;
    leave(request: Request, id: string): Promise<import("typeorm").DeleteResult>;
}
