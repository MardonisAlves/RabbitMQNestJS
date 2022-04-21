import {IsNotEmpty ,IsEmail} from 'class-validator';

export class GetjogadorByEmail {

	
	@IsNotEmpty()
	readonly email:string;
}