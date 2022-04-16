import { Controller, Post, Get, Logger,Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import {CriarJogadorDto} from './dtos/criar-jogador-dto';
import {ClienteProxySmartRank} from '../proxyrmq/cliente-proxy'
import { Observable } from 'rxjs';

@Controller('api/v1')
export class JogadoresController {
private  logger = new Logger(JogadoresController.name);

constructor(private ClienteProxySmartRank:ClienteProxySmartRank){}
private  clientAdminBackend = this.ClienteProxySmartRank.getClienteProxyBackendInstance()

@Post('jogadores')
@UsePipes(ValidationPipe)
async criarjogador(@Body() criarJogadorDto:CriarJogadorDto){
	await this.clientAdminBackend.emit('new-jogador',criarJogadorDto);
}

@Get('jogadores')
getjogadores(@Query('_id') _id:string) :Observable<any>{
	return  this.clientAdminBackend.send('jogadores' , _id ? _id :'')
}
}
