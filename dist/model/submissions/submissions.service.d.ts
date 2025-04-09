import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { User } from '../users/entities/users.entity';
export declare class SubmissionsService {
    private assignmentRepository;
    constructor(assignmentRepository: Repository<Submission>);
    create(id: string | undefined, user: User, assignmentId: string, dto: CreateSubmissionDto, file: Express.Multer.File): Promise<Submission | import("typeorm").UpdateResult>;
    findAll(assignmentid: string): Promise<Submission | null>;
    findOne(id: string): Promise<Submission | null>;
    update(id: string, updateSubmissionDto: UpdateSubmissionDto): Promise<Submission>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
