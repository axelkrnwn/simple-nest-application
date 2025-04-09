import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';

@Injectable()
export class SubmissionsService {
  constructor(@InjectRepository(Submission) private assignmentRepository:Repository<Submission>){}

  async create(id:string | undefined, user:User, assignmentId:string, dto: CreateSubmissionDto, file:Express.Multer.File) {
    

    if (!file) {
            throw new BadRequestException('no file uploaded');
    }
    const maxSize = 100 * 1024 * 1024;
    if (
        file.size > maxSize) {
        throw new BadRequestException('file is too large!');
    }
    if (id){
      const updated = await this.findOne(id)
      if (!updated){
        throw new Error("assignment not found!")
      }
      updated.file = file.path   
      return await this.assignmentRepository.update(id, updated)
    }
    const newSubmission = this.assignmentRepository.create({...dto,file:file.path, assignment:{id:assignmentId}, user:user})
    console.log(newSubmission)

    return await this.assignmentRepository.save(newSubmission)
  }

  async findAll(assignmentid: string) {
    return await this.assignmentRepository.findOne({where:{assignment:{id:assignmentid}}});
  }

  async findOne(id: string) {
    return await this.assignmentRepository.findOne({where:{id:id}});
  }

  async update(id: string, updateSubmissionDto: UpdateSubmissionDto) {
    const updated = await this.findOne(id)

    if (!updated){
      throw new Error("assignment not found!")
    }
    const data = this.assignmentRepository.merge(
      updated,
      updateSubmissionDto,
    );
    return await this.assignmentRepository.save(
      data,
    );
  }

  async remove(id: string) {
    return await this.assignmentRepository.delete(id)
  }
}
