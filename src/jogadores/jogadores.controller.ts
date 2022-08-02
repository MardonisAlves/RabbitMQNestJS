import { Controller, Post, Get, Put, Delete, Res, Logger, Body, Query, Param, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador-dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador-dto';
import { GetjogadorByEmail } from './dtos//getjogador-email-dto';
import { ClienteProxySmartRank } from '../proxyrmq/cliente-proxy';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from '../aws/aws.service';
import { ApiCreatedResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import responseCriatejogador from './response/response-create-jogador';



@ApiTags('jogadores')
@Controller('api/v1')
export class JogadoresController {
	private logger = new Logger(JogadoresController.name);

	constructor(
		private ClienteProxySmartRank: ClienteProxySmartRank,
		private awsService: AwsService
	) { }
	private clientAdminBackend = this.ClienteProxySmartRank.getClienteProxyBackendInstance()

	@Post('jogadores')
	@ApiResponse({
		type:responseCriatejogador
	})
	@UsePipes(ValidationPipe)
	async criarjogador(@Body() criarJogadorDto: CriarJogadorDto, @Res() response: Response) {
		try {
			const { email } = criarJogadorDto
			const emailJogador = await this.clientAdminBackend.send('getjogador-email', { email: criarJogadorDto.email }).toPromise();
			if (emailJogador === null) {
				const criarjogador = this.clientAdminBackend.emit('new-jogador', criarJogadorDto);
				return response.json({ 'message': 'Jogador  cadastrado' ,success:true});
			} else {
				return response.json({ 'message': 'Jogador ja cadastrado', success:false});
			}
		} catch (error) {
			console.log(error)
		}
	}

	@Post('/:_id/upload')
	@UseInterceptors(FileInterceptor('file'))
	async uploadArquivo(
		@UploadedFile() file: any,
		@Param('_id') _id: string
	) {
		try {
			const idJogador =  this.getjogadores(_id).pipe();
			if (_id) {
				const data = await this.awsService.uploadarquivos3(file, _id);
				if (data.url) {
					const urlJogador =  this.clientAdminBackend.send('atualizar-avatar', { _id, urlFotoJogador: data.url })
					.pipe()
					const getJogador =  this.clientAdminBackend.send('jogadores', _id ? _id : '').pipe();
					return getJogador;

				}
			} else {
				return {
					jogador: 'Jogador não cadastrado'
				}
			}

		} catch (error) {
			console.log(error)
		}


	}

	@Get('jogadores')
	@ApiResponse({
		type:responseCriatejogador
	})
	getjogadores(@Query('_id') _id: string ): Observable<any> {
		return this.clientAdminBackend.send('jogadores', _id ? _id : '')
	}

	@Get('jogador/email')
	@UsePipes(ValidationPipe)
	getjogadorByEmail(@Query() email: GetjogadorByEmail): Observable<any> {
		return this.clientAdminBackend.send('getjogador-email', email)
	}

	@Put('jogadores/:_id')
	@UsePipes(ValidationPipe)
	atualizarJogador(@Body() atualizarJogadorDto: AtualizarJogadorDto, @Param('_id') _id: string) {
		try {
			return this.clientAdminBackend.send('atualizar-jogador', { atualizarJogadorDto, _id })
		} catch (error) {
			this.logger.log(error)
		}
	}

	@Delete('jogador/:_id')
	deletarJogador(@Param('_id') _id: string) {
		try {
			return this.clientAdminBackend.send('deletar-jogador', _id)
		} catch (error) {
			this.logger.log(error)
		}

	}


	@Post('send/email')
	@ApiCreatedResponse({
		type:CreateUserDto
	})
	async sendEmail(@Body() user:CreateUserDto):Promise<any>{
		try {
			return  this.clientAdminBackend.send('email',user);
		} catch (error) {
			console.log(error);
		}
	}
}
