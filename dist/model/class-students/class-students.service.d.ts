import { CreateClassStudentDto } from './dto/create-class-student.dto';
import { UpdateClassStudentDto } from './dto/update-class-student.dto';
import { ClassStudent } from './entities/class-student.entity';
import { Repository } from 'typeorm';
export declare class ClassStudentsService {
    private repo;
    constructor(repo: Repository<ClassStudent>);
    create(userId: string, dto: CreateClassStudentDto): Promise<ClassStudent>;
    findByUser(userId: string): Promise<ClassStudent[]>;
    findByCourse(courseId: string): Promise<ClassStudent[]>;
    update(id: string, dto: UpdateClassStudentDto): Promise<ClassStudent>;
    remove(userId: string, courseId: string): Promise<import("typeorm").UpdateResult>;
}
