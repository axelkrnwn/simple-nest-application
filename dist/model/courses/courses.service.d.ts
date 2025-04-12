import { Repository } from 'typeorm';
import { Course } from './entities/courses.entity';
import { AddCourseDTO } from './dtos/add-course.dto';
import { User } from '../users/entities/users.entity';
export declare class CoursesService {
    private courseRepository;
    constructor(courseRepository: Repository<Course>);
    addCourse(teacher: User, dto: AddCourseDTO, image: Express.Multer.File): Promise<Course>;
    getAllCourse(): Promise<Course[]>;
    getCourse(id: string): Promise<Course | null>;
    getCourseByTeacher(userId: string): Promise<Course[]>;
}
