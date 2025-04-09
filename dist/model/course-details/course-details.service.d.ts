import { CreateCourseDetailDto } from './dto/create-course-detail.dto';
import { UpdateCourseDetailDto } from './dto/update-course-detail.dto';
import { CourseDetail } from './entities/course-detail.entity';
import { Repository } from 'typeorm';
export declare class CourseDetailsService {
    private courseRepository;
    constructor(courseRepository: Repository<CourseDetail>);
    create(dto: CreateCourseDetailDto, files: Express.Multer.File, courseId: string): Promise<CourseDetail>;
    findOne(id: string): Promise<CourseDetail | null>;
    update(id: string, updateCourseDetailDto: UpdateCourseDetailDto): Promise<CourseDetail>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
