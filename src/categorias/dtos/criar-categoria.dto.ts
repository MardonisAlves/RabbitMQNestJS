import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from "class-validator";
import { Evento } from "../interfaces/categoria.interface";
import { ApiProperty } from "@nestjs/swagger";

export class CriarCategoriaDto {
    @ApiProperty({
		example:"A"
	})
    @IsString()
    @IsNotEmpty()
    readonly categoria: string;


    @ApiProperty({
		example:"descrição"
	})
    @IsString()
    @IsNotEmpty()
    descricao: string;


    @ApiProperty({
		example:[{
            nome:"Mardonis Alves",
            operacao:"add",
            valor:50
        }]
	})
    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>

}