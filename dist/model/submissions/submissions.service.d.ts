import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
export declare class SubmissionsService {
    create(createSubmissionDto: CreateSubmissionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSubmissionDto: UpdateSubmissionDto): string;
    remove(id: number): string;
}
