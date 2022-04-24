import { Controller, Post, Get, Put, Res, Logger,Body, Query, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import {CriarJogadorDto} from './dtos/criar-jogador-dto';
import {AtualizarJogadorDto} from './dtos/atualizar-jogador-dto';
import {GetjogadorByEmail} from './dtos//getjogador-email-dto';
import {ClienteProxySmartRank} from '../proxyrmq/cliente-proxy';
import { Observable } from 'rxjs';
import {Response} from 'express';
@Controller('api/v1')
export class JogadoresController {
private  logger = new Logger(JogadoresController.name);

constructor(private ClienteProxySmartRank:ClienteProxySmartRank){}
private  clientAdminBackend = this.ClienteProxySmartRank.getClienteProxyBackendInstance()

@Post('jogadores')
@UsePipes(ValidationPipe)
async criarjogador(@Body() criarJogadorDto:CriarJogadorDto, @Res() response:Response){
	try{
		const { email } = criarJogadorDto
		const emailJogador = await this.clientAdminBackend.send('getjogador-email', {email:criarJogadorDto.email}).toPromise();
		if(emailJogador === null){
			const criarjogador = await this.clientAdminBackend.emit('new-jogador',criarJogadorDto);
			return response.json({'jogador': 'Jogador  cadastrado'});
		}else{
			return response.json({'jogador': 'Jogador ja cadastrado'});
	}
	}catch(error){
		console.log(error)
	}
}

@Get('jogadores')
getjogadores(@Query('_id') _id:string) :Observable<any>{
	return  this.clientAdminBackend.send('jogadores' , _id ? _id :'')
}

@Get('jogador/email')
@UsePipes(ValidationPipe)
getjogadorByEmail(@Query() email:GetjogadorByEmail): Observable<any>{
		return this.clientAdminBackend.send('getjogador-email', email)
}

@Put('jogadores/:_id')
@UsePipes(ValidationPipe)
atualizarJogador(@Body() atualizarJogadorDto:AtualizarJogadorDto, @Param() _id:string){
	try{
	
	return this.clientAdminBackend.send('atualizar-jogador',{atualizarJogadorDto,_id})
	}catch(error){
		this.logger.log(error)
	}
}
}
