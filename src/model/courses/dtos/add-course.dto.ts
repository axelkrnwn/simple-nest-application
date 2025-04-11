import { UploadedFile } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class AddCourseDTO{

    @ApiProperty({
            example: 'course title',
            required: true
        })
        title: string;
    @ApiProperty({
            example: 'course description',
            required: true
        })
    description:string;
}