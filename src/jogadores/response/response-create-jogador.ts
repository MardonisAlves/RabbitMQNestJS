import { ApiProperty } from "@nestjs/swagger";

export default class responseCriatejogador{
        @ApiProperty({
            example:"jogador cadastrado"
        })
        message: string

        @ApiProperty({
            example:true
        })
        success:boolean
      
}