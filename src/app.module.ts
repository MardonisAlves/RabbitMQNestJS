import { Module } from '@nestjs/common';
import { ProxyrmqModule } from './proxyrmq/proxyrmq.module';
import { JogadoresController } from './jogadores/jogadores.controller';
import { CategoriasController } from './categorias/categorias.controller';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [ProxyrmqModule, CategoriasModule, JogadoresModule ],
  controllers: [JogadoresController, CategoriasController],
  providers: [],
})
export class AppModule {}
