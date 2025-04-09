import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssignmentsService {
  constructor(@InjectRepository(Assignment) private assignmentRepository:Repository<Assignment>){}

  async create(courseId:string, dto: CreateAssignmentDto, file:Express.Multer.File) {
    if (dto.title.length < 5 || dto.title.length > 50){
        throw new BadRequestException('title must be 5-50 characters');
    }
    if (dto.description.length < 5 || dto.description.length > 100){
        throw new BadRequestException('description must be 5-100 characters');
    }
    if (!file) {
        throw new BadRequestException('no file uploaded');
    }
    const maxSize = 100 * 1024 * 1024;
    if (
        file.size > maxSize) {
        throw new BadRequestException('file is too large!');
    }
    const newCourse = this.assignmentRepository.create({...dto, attachment:file.path, course:{id:courseId}})
    console.log('Saving course detail:', newCourse)
    return await this.assignmentRepository.save(newCourse)
  }

  async findOne(id: string) {
    return await this.assignmentRepository.findOne({where:{id:id}});
  }

  async update(id: string, updateAssignmentDto: UpdateAssignmentDto) {
    const updated = await this.findOne(id)

    if (!updated){
      throw new Error("course's post not found!")
    }
    const data = this.assignmentRepository.merge(
      updated,
      updateAssignmentDto,
    );
    return await this.assignmentRepository.save(
      data,
    );
  }

  async remove(id: string) {
    return await this.assignmentRepository.delete(id)
  }
}
