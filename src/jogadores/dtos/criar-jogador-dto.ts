import {IsNotEmpty ,IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriarJogadorDto {
	
	@ApiProperty({
		example:"85 992590075"
	})
	@IsNotEmpty()
	readonly telefoneCelular: string;

	@ApiProperty({
		example:"mardonisgp@gmail.com"
	})
	@IsEmail()
	readonly email:string;
	

	@ApiProperty({
		example:"Mardonis Alves Bezerra"
	})
	@IsNotEmpty()
	readonly nome:string;


	@ApiProperty({
		example:"A"
	})
	 @IsNotEmpty()
	 readonly categoria:string;
}