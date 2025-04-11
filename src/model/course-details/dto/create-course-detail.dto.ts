import { UploadedFile } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDetailDto {
    
        @ApiProperty({
                example: 'course detail title',
                required: true
            })
            title: string;
        @ApiProperty({
                example: 'course detail description',
                required: true
            })
        description:string;
}
