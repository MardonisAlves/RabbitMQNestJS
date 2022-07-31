import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export default class Whatsap{
    @ApiProperty({
        example:'Ola teste whatsap'
    })
    @IsString()
    @IsNotEmpty()
    message:string;


    @ApiProperty({
        example:'whatsapp:+14155238886'
    })
    from:string;
    
    
    @ApiProperty({
        example:'whatsapp:+5585992590075'
    })
    to:string;
}