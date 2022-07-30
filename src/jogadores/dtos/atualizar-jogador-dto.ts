import {IsNotEmpty ,IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AtualizarJogadorDto {
	@ApiProperty({
		example:"85 992590075"
	})
	@IsNotEmpty()
	readonly telefoneCelular: string;
	
	@ApiProperty({
		example:"mardonisgp@gmail.com"
	})
	@IsNotEmpty()
	readonly email:string;


	@ApiProperty({
		example:"Mardonis Alves B"
	})
	@IsNotEmpty()
	readonly nome:string;


	@ApiProperty({
		example:"23"
	})
	@IsNotEmpty()
	readonly ranking:string;


	@ApiProperty({
		example:"5"
	})
	@IsNotEmpty()
	readonly posicaoRanking:string;


	@ApiProperty({
		example:"http:tete.com"
	})
	@IsNotEmpty()
	readonly urlFotoJogador:string; 
}