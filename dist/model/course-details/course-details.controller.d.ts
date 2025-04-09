import { CourseDetailsService } from './course-details.service';
import { CreateCourseDetailDto } from './dto/create-course-detail.dto';
import { UpdateCourseDetailDto } from './dto/update-course-detail.dto';
export declare class CourseDetailsController {
    private readonly courseDetailsService;
    constructor(courseDetailsService: CourseDetailsService);
    create(courseid: string, createCourseDetailDto: CreateCourseDetailDto, file: Express.Multer.File): Promise<import("./entities/course-detail.entity").CourseDetail>;
    findOne(id: string): Promise<import("./entities/course-detail.entity").CourseDetail | null>;
    update(id: string, updateCourseDetailDto: UpdateCourseDetailDto): Promise<import("./entities/course-detail.entity").CourseDetail>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
