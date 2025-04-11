import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({
        example: 'Axel Kurniawan',
        required: true
     })
    username: string;
    @ApiProperty({
        example: 'axel.kurniawan@gmail.com',
        required: true
    })
    email: string;
    @ApiProperty({
        example: 'teacher | student',
        required: true
    })
    role: string;
    @ApiProperty({
        example: '123 Testing St.',
    })
    address: string;
    @ApiProperty({
        example: 'axel1234',
        required: true
     })
    password: string;
}