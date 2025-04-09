import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDetailDto } from './dto/create-course-detail.dto';
import { UpdateCourseDetailDto } from './dto/update-course-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseDetail } from './entities/course-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseDetailsService {

  constructor(@InjectRepository(CourseDetail) private courseRepository:Repository<CourseDetail> ){}

  async create(dto: CreateCourseDetailDto, files:Express.Multer.File, courseId:string) {
      if (dto.title.length < 5 || dto.title.length > 50){
                throw new BadRequestException('title must be 5-50 characters');
      }
      if (dto.description.length < 5 || dto.description.length > 100){
          throw new BadRequestException('description must be 5-100 characters');
      }
      if (!files) {
          throw new BadRequestException('no file uploaded');
      }
      const maxSize = 100 * 1024 * 1024;
        if (
            files.size > maxSize) {
            throw new BadRequestException('file is too large!');
        }
      
      const newCourse = this.courseRepository.create({...dto, createdDate: new Date(), attachment:files.path, course:{id:courseId}})
      console.log('Saving course detail:', newCourse)
      return await this.courseRepository.save(newCourse)
  }

  async findOne(id: string) {
    return await this.courseRepository.findOne({where:{id:id}});
  }

  async update(id: string, updateCourseDetailDto: UpdateCourseDetailDto) {
    const updated = await this.findOne(id)

    if (!updated){
      throw new Error("course's post not found!")
    }
    const data = this.courseRepository.merge(
      updated,
      updateCourseDetailDto,
    );
    return await this.courseRepository.save(
      data,
    );

  }

  async remove(id: string) {
    return await this.courseRepository.delete(id)
  }
}
