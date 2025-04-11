import { ApiProperty } from "@nestjs/swagger";

export class CreateClassStudentDto {
    @ApiProperty({
        required: true
    })
    courseId:string
}
