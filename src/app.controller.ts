import { Controller, Get, Post, Logger, UsePipes, Body, ValidationPipe} from '@nestjs/common';
import {ClientProxy, ClientProxyFactory,Transport } from '@nestjs/microservices'
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';


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
    return  await this.clientAdminBackend.emit('criarcategoria', criarCategoriaDto)
  }
}
