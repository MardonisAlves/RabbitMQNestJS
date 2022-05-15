import { Module } from '@nestjs/common';
import { ProxyrmqModule } from './proxyrmq/proxyrmq.module';
import { JogadoresController } from './jogadores/jogadores.controller';
import { CategoriasController } from './categorias/categorias.controller';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
  ConfigModule.forRoot({isGlobal: true}),
  ProxyrmqModule, 
  CategoriasModule,
   JogadoresModule, 
   AwsModule,
  ],
  controllers: [JogadoresController, CategoriasController],
  providers: [],
})
export class AppModule {}
