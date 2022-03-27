import {PipeTransform,ArgumentMetadata,BadRequestException} from '@nestjs/common';

export class ValidationJogadoresPipes implements PipeTransform{

	transform(value: any, metadata:ArgumentMetadata){
		if(!value){
			throw new BadRequestException(`O valor ${metadata.data} dev ser informado`)
		}
		return value;
	}
}