import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignmentDto } from './create-assignment.dto';

export class UpdateAssignmentDto extends PartialType(CreateAssignmentDto) {
    title?: string | undefined;
    deadline?: Date | undefined;
    description?: string | undefined;
}
