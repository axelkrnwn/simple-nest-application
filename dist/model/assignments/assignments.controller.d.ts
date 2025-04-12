import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    create(courseid: string, createAssignmentDto: CreateAssignmentDto, file: Express.Multer.File): Promise<import("./entities/assignment.entity").Assignment>;
    findOne(id: string): Promise<import("./entities/assignment.entity").Assignment | null>;
    update(id: string, updateAssignmentDto: UpdateAssignmentDto, file: Express.Multer.File): Promise<import("./entities/assignment.entity").Assignment>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
