import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { ClassStudent } from '../class-students/entities/class-student.entity';
import { Assignment } from '../assignments/entities/assignment.entity';

@Injectable()
export class SubmissionsService {
  constructor(@InjectRepository(Submission) private submissionRepository:Repository<Submission>,
  @InjectRepository(Assignment) private assignmentRepository:Repository<Assignment>,
  // @InjectRepository(ClassStudent) private studentRepository:Repository<ClassStudent>
){}

  async create(id:string | undefined, user:User, assignmentId:string, dto: CreateSubmissionDto, file:Express.Multer.File) {
    if (!file) {
            throw new BadRequestException('no file uploaded');
    }
    const maxSize = 100 * 1024 * 1024;
    if (
        file.size > maxSize) {
        throw new BadRequestException('file is too large!');
    }
    const asg = await this.assignmentRepository.findOne({where:{id:assignmentId}})
    const currentDate = new Date();
    
    if (!asg) throw new BadRequestException("Assignment not found")
    if (asg.deadline.getTime() < currentDate.getTime()){
      throw new BadRequestException("Deadline has been exceeded")
    }
    if (id){
      console.log("should be not here")
      const updated = await this.findOne(id)
      if (!updated){
        throw new Error("assignment not found!")
      }
      updated.file = file.path   
      return await this.submissionRepository.update(id, updated)
    }

    const newSubmission = this.submissionRepository.create({...dto,file:file.path, assignment:{id:assignmentId}, user:user})
    console.log("Saving submission " + newSubmission)

    return await this.submissionRepository.save(newSubmission)
  }

  async findAll(assignmentid: string) {
    return await this.submissionRepository.findOne({where:{assignment:{id:assignmentid}}});
  }

  async findOne(id: string) {
    return await this.submissionRepository.findOne({where:{id:id}});
  }

  async update(id: string, updateSubmissionDto: UpdateSubmissionDto) {
    const updated = await this.findOne(id)

    if (!updated){
      throw new Error("assignment not found!")
    }
    const data = this.submissionRepository.merge(
      updated,
      updateSubmissionDto,
    );
    return await this.submissionRepository.save(
      data,
    );
  }

  async remove(id: string) {
    return await this.submissionRepository.delete(id)
  }
}
