import { ApiProperty } from "@nestjs/swagger";

export class CreateAssignmentDto {
    @ApiProperty({
        example: 'assignment title',
        required: true
    })
    title: string;
    @ApiProperty({
        example: 'assignment description',
        required: true
    })
    description:string;
    @ApiProperty({
        example: 'assignment deadline',
        required: true
    })
    deadline:Date;
}
