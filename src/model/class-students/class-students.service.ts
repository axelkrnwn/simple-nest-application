import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateClassStudentDto } from './dto/create-class-student.dto';
import { UpdateClassStudentDto } from './dto/update-class-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassStudent } from './entities/class-student.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';

@Injectable()
export class ClassStudentsService {
  
  constructor(@InjectRepository(ClassStudent) private repo:Repository<ClassStudent>){}

  async create(user:User,dto: CreateClassStudentDto) {
    console.log(dto)
    if (user.role != "student"){
      throw new UnauthorizedException();
    }
    const enroll = await this.find(user.id, dto.courseId)

    if (enroll != null){
      throw new UnauthorizedException();
    }

    if (dto.courseId == ""){
      throw new Error("Course invalid");
    }
    const data = this.repo.create({studentId:user.id, ...dto, enrollmentDate:new Date()})

    return await this.repo.save(data)
  }
  async find(userId:string, courseId:string) {
    return await this.repo.findOne({where:{studentId:userId, courseId:courseId}})
  }

  async findByUser(user:User){
    if (user.role == 'admin'){
      return await this.repo.find({relations:{
        course: {
          teacher: true,
          assignments: {
            submissions:true
          }
        }
      }})
    }
    return await this.repo.find({where:{studentId:user.id}, relations:{
      course: {
        teacher: true,
        assignments: true
      }
    }})
  }
  async findByCourse(courseId:string){
    return await this.repo.find({where:{courseId:courseId}, relations:['student'], select: {student: true}})
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
    return await this.repo.delete({courseId:courseId, studentId:userId})
  }
}
