import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export default class responseJogadores {
    @ApiProperty({
        example: '62e876328c2e6d7a9b56b7e3'
    })
    _id: string;


    @ApiProperty({
        example: "85 992590075"
    })
    telefoneCelular: string;


    @ApiProperty({
        example: 'mardoni47s25deaswd7gp@gmail.com'
    })
    email: string;



    @ApiProperty({
        example:"Mardonisk Alves Bezerra"
    })
    nome: "Mardonisk Alves Bezerra";



    @ApiProperty({
        example:"2022-08-02T00:56:18.879Z"
    })
    createdAt: string;


    
    @ApiProperty({
        example:"2022-08-02T00:56:18.879Z"
    })
    updatedAt: "2022-08-02T00:56:18.879Z";
   

}