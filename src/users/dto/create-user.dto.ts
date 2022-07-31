import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
    @ApiProperty({
        example:"mardonis.bezerra@gmail.com"
    })
    @IsString()
    @IsNotEmpty()
    email: string;


    @ApiProperty({
        example:"Mardonis Alves"
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
