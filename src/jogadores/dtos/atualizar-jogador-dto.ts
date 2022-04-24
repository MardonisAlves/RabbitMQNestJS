import {IsNotEmpty ,IsEmail} from 'class-validator';

export class AtualizarJogadorDto {

	@IsNotEmpty()
	readonly telefoneCelular: string;
	
	@IsNotEmpty()
	readonly email:string;

	@IsNotEmpty()
	readonly nome:string;

	@IsNotEmpty()
	readonly ranking:string;

	@IsNotEmpty()
	readonly posicaoRanking:string;

	@IsNotEmpty()
	readonly urlFotoJogador:string; 
}