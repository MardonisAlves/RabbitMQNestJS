import { Controller, Get, Post, Logger, UsePipes, Body, ValidationPipe, Query} from '@nestjs/common';
import {ClientProxy, ClientProxyFactory,Transport } from '@nestjs/microservices'
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Observable } from 'rxjs';


@Controller('api/v1')
export class AppController {

  private logger = new Logger(AppController.name)

  private clientAdminBackend:ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options:{
         urls: ['	amqps://admin:h2szqHJUT0B8WVV8JQIuZINfauOmaKLc@dphkbz.stackhero-network.com:5671'],
        queue:'filas_martrank',
        queueOptions: {
          durable: true
        }
      }
    })
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
async  criarcategoria(@Body() criarCategoriaDto: CriarCategoriaDto){
      await this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto)
  }


@Get('categorias')
   consultarCategorias(@Query('idCategoria') _id: string): Observable<any>{
    return ;
    //return this.clientAdminBackend.send('consultar-categorias', _id ? _id:'')
  }
}
