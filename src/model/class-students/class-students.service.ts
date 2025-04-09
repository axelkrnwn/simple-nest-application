import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateClassStudentDto } from './dto/create-class-student.dto';
import { UpdateClassStudentDto } from './dto/update-class-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassStudent } from './entities/class-student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassStudentsService {
  
  constructor(@InjectRepository(ClassStudent) private repo:Repository<ClassStudent>){}

  async create(userId:string,dto: CreateClassStudentDto) {
    if (userId == ""){
      throw new UnauthorizedException();
    }
    if (dto.courseId == ""){
      throw new Error("Course invalid");
    }
    const data = this.repo.create({studentId:userId, ...dto, enrollmentDate:new Date()})

    return await this.repo.save(data)
  }

  async findByUser(userId:string){
    return await this.repo.find({where:{studentId:userId}, relations:['course']})
  }
  async findByCourse(courseId:string){
    return await this.repo.find({where:{courseId:courseId}, relations:['student']})
  }

  async update(id: string, dto: UpdateClassStudentDto) {
    if (id == ""){
      throw new UnauthorizedException();
    }
    if (!dto.courseId){
      throw new Error("Course invalid");
    }
    let updated = await this.repo.findOne({where:{studentId:id, courseId:dto.courseId}})
    if (!updated){
      throw new Error("Course not found");
    }
    updated.courseId = dto.courseId
    return await this.repo.save(updated)
  }

  async remove(userId: string, courseId: string) {
    return await this.repo.softDelete({courseId:courseId, studentId:userId})
  }
}
