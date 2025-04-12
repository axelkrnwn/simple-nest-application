import { PartialType } from '@nestjs/mapped-types';
import { CreateSubmissionDto } from './create-submission.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubmissionDto extends PartialType(CreateSubmissionDto) {
    @ApiProperty({
        example: '100',
        required: true
    })
    score:number;
    @ApiProperty({
        example: 'Very good',
        required: true
    })
    feedback:string;
}
