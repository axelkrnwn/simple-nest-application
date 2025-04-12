import { CoursesService } from './courses.service';
import { AddCourseDTO } from './dtos/add-course.dto';
import { Request } from 'express';
export declare class CoursesController {
    private courseService;
    constructor(courseService: CoursesService);
    addCourse(request: Request, dto: AddCourseDTO, image: Express.Multer.File): Promise<void>;
    getCourses(): Promise<import("./entities/courses.entity").Course[]>;
    getCourseByTeacher(request: Request): Promise<import("./entities/courses.entity").Course[]>;
    getCourse(params: any): Promise<import("./entities/courses.entity").Course | null>;
}
