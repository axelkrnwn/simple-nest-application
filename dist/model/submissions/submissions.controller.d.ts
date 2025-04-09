import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
export declare class SubmissionsController {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    create(request: Request, assignmentid: string, createSubmissionDto: CreateSubmissionDto, file: Express.Multer.File, id?: string): Promise<import("./entities/submission.entity").Submission | import("typeorm").UpdateResult>;
    findAll(assignmentid: string): Promise<import("./entities/submission.entity").Submission | null>;
    findOne(id: string): Promise<import("./entities/submission.entity").Submission | null>;
    update(id: string, updateSubmissionDto: UpdateSubmissionDto): Promise<import("./entities/submission.entity").Submission>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
