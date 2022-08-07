import { Controller, Post, Get, Put, Delete, Res, Logger, Body, Query, Param, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador-dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador-dto';
import { GetjogadorByEmail } from './dtos//getjogador-email-dto';
import { ClienteProxySmartRank } from '../proxyrmq/cliente-proxy';
import { firstValueFrom, Observable } from 'rxjs';
import { response, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from '../aws/aws.service';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiPropertyOptional, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import responseCriatejogador from './response/response-create-jogador';
import getJogadores from './dtos/get-jogadores-dtos';
import responseJogadores from './responses/response-jogadores';



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
	@ApiInternalServerErrorResponse({
		description: 'Error no servidor status 500'
	})
	@ApiCreatedResponse({
		type: responseCriatejogador,
		description: 'A resposta é uma messagem de sucesso'

	})
	@ApiOkResponse({
		description: 'O jagador js esta cadastrado'
	})
	@UsePipes(ValidationPipe)
	async criarjogador(@Body() criarJogadorDto: CriarJogadorDto, @Res() response: Response) {
		try {
			const { email } = criarJogadorDto
			const emailJogador = await this.clientAdminBackend.send('getjogador-email', { email: criarJogadorDto.email }).toPromise();
			if (emailJogador === null) {
				const criarjogador = this.clientAdminBackend.emit('new-jogador', criarJogadorDto);
				return response.json({ 'message': 'Jogador  cadastrado', success: true });
			} else {
				return response.json({ 'message': 'Jogador ja cadastrado', success: false });
			}
		} catch (err) {
			throw new HttpException({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: 'Houve um error inseperado',
			}, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post('/:_id/upload')
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
		  type: 'object',
		  properties: {
			file: { 
			  type: 'string',
			  format: 'binary',
			},
		  },
		},
	  })
	async uploadArquivo(
		@UploadedFile() file: Express.Multer.File,
		@Param() _id: getJogadores
	) {
		try {
		console.log(_id._id);
		
			const idJogador = this.getjogadores(_id).pipe();
			console.log(idJogador);
			
			if (_id._id !== '') {
				const data = await this.awsService.uploadarquivos3(file, _id._id);
				console.log(data);
				
				if (data.url) {
					return await firstValueFrom( this.clientAdminBackend.send('atualizar-avatar', { _id, urlFotoJogador: data.url }))
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
	@ApiResponse({ type: responseJogadores })
	getjogadores(@Query() _id: getJogadores): Observable<any> {
		try {
			const jogadores = this.clientAdminBackend.send('jogadores', _id._id ? _id : '');
			if (jogadores) {
				return jogadores
			}
		} catch (error) {
			throw new HttpException({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: 'Houve um error inesperado',
			}, HttpStatus.INTERNAL_SERVER_ERROR);

		}
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
		type: CreateUserDto
	})
	async sendEmail(@Body() user: CreateUserDto): Promise<any> {
		try {
			return this.clientAdminBackend.send('email', user);
		} catch (error) {
			console.log(error);
		}
	}
}


