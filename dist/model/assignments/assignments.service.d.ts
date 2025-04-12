import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
export declare class AssignmentsService {
    private assignmentRepository;
    constructor(assignmentRepository: Repository<Assignment>);
    create(courseId: string, dto: CreateAssignmentDto, file: Express.Multer.File): Promise<Assignment>;
    findOne(id: string): Promise<Assignment | null>;
    update(id: string, updateAssignmentDto: UpdateAssignmentDto, file: Express.Multer.File): Promise<Assignment>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
