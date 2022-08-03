import { ApiProperty, ApiPropertyOptional, ApiQuery } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export default class getJogadores{
    @ApiPropertyOptional({
    example:'62e876328c2e6d7a9b56b7e3',
    required:false
    })
    @IsString()
    _id:string;

}