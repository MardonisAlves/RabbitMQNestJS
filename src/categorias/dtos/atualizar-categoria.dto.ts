import { IsString, IsOptional, IsArray, ArrayMinSize } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class AtualizarCategoriaDto {
    @ApiProperty({
        example: 'descrição'
      })

    @IsString()
    @IsOptional()
    descricao: string;

    @ApiProperty({
        example: [{
            "name":"",
            "operacao":"",
            "valor":""
        }]
      })
    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>

}

interface Evento {
    nome: string;
    operacao: string;
    valor: number;
}