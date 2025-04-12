import { CreateAssignmentDto } from './create-assignment.dto';
declare const UpdateAssignmentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAssignmentDto>>;
export declare class UpdateAssignmentDto extends UpdateAssignmentDto_base {
    title?: string | undefined;
    deadline?: Date | undefined;
    description?: string | undefined;
}
export {};
