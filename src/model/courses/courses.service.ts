import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/courses.entity';
import { AddCourseDTO } from './dtos/add-course.dto';
import { User } from '../users/entities/users.entity';

@Injectable()
export class CoursesService {

    constructor(@InjectRepository(Course) private courseRepository:Repository<Course>){}

    async addCourse(teacher:User, dto: AddCourseDTO, image: Express.Multer.File){
        console.log(image)
        if (dto.title.length < 5 || dto.title.length > 50){
            throw new BadRequestException('title must be 5-50 characters');
        }
        if (dto.description.length < 5 || dto.description.length > 100){
            throw new BadRequestException('description must be 5-100 characters');
        }
        // if (!
        //     image) {
        //     throw new BadRequestException('no file uploaded');
        // }
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedMimeTypes.includes(
            image.mimetype)) {
            throw new BadRequestException('invalid file type');
        }
    
        const maxSize = 5 * 1024 * 1024;
        if (
            image.size > maxSize) {
            throw new BadRequestException('file is too large!');
        }

        const newCourse = this.courseRepository.create({...dto, image:image.path, teacher:teacher})
        console.log('Saving course:', newCourse)
        return await this.courseRepository.save(newCourse)
    }

    async getAllCourse(){
        return await this.courseRepository.find();
    }

    async getCourse(id:string){
        return await this.courseRepository.findOne({relations:['courseDetails', 'assignments'],where:{id:id}});
    }

}
