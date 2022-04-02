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
        //urls: ['amqp://user:Dd1ZtU4Q8IT1@54.82.54.169:5672/smartrank'],
         urls: ['amqp://admin:admin@localhost:5672'],
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
    return this.clientAdminBackend.send('consultar-categorias', _id ? _id:'')
  }
}
