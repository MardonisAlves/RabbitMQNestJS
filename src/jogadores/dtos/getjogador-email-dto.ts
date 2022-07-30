import {IsNotEmpty ,IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GetjogadorByEmail {

	@ApiProperty({
		example: "mardonisgp@gmail.com"
	})
	@IsNotEmpty()
	readonly email:string;
}