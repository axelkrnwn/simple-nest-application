import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
    @ApiProperty({
        example: 'axel.kurniawan@gmail.com',
        required: true
    })
    email: string;
    @ApiProperty({
        example: 'axel1234',
        required: true
    })
    password: string;
}