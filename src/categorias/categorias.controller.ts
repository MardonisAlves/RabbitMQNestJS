import { Controller, Get, Post, Put, Delete, Logger, UsePipes, Body, ValidationPipe, Param, Query} from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import {ClienteProxySmartRank} from '../proxyrmq/cliente-proxy';
import { Observable } from 'rxjs';

@Controller('api/v1')
export class CategoriasController {
    private logger = new Logger(CategoriasController.name)

  constructor(private ClienteProxySmartRank:ClienteProxySmartRank){}
  private clientAdminBackend = this.ClienteProxySmartRank.getClienteProxyBackendInstance();
  @Get('/home')
  async pageHome() :Promise<string>{
    return 'Hello';
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



@Put('categorias/:_id')
@UsePipes(ValidationPipe)
atualizarCategoria(@Body() atualizarCategoriaDto: AtualizarCategoriaDto,
  @Param('_id') _id: string){

 this.clientAdminBackend.emit('atualizar-categoria',{_id , categoria:atualizarCategoriaDto})
}



@Delete('categoria/:_id')
@UsePipes(ValidationPipe)
deletarCategoria(@Param() _id:string){
this.clientAdminBackend.emit('deletar-categoria',{_id})

}
}
