import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
export declare class SubmissionsController {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    create(createSubmissionDto: CreateSubmissionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSubmissionDto: UpdateSubmissionDto): string;
    remove(id: string): string;
}
