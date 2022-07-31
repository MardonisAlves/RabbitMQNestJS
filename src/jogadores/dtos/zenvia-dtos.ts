import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export default class Zenvia{
    @ApiProperty({
        example:'Ola teste zenvia'
    })
    @IsString()
    @IsNotEmpty()
    message:string;


    @ApiProperty({
        example:'agenda'
    })
    from:string;
    
    
    @ApiProperty({
        example:'5585992590075'
    })
    to:string;
}