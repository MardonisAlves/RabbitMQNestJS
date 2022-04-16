import {IsNotEmpty ,IsEmail} from 'class-validator';

export class AtualizarJogadorDto {

	@IsNotEmpty()
	readonly telefoneCelular: string;
	
	@IsNotEmpty()
	readonly email:string;
}