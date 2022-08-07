import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import * as momentTimezone from 'moment-timezone';
import { LoggerInterceptor }  from './interceptors/logger.interceptor';
import { TimeoputInterceptor } from './interceptors/timeout.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggerInterceptor(), new TimeoputInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  Date.prototype.toJSON = function(): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS')
  }


 
  const config = new DocumentBuilder()
    .setTitle('Api smart rank')
    .setDescription('Simple microservices com rabbitmq')
    .setVersion('1.0')
    .addTag('jogadores , categorias')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(process.env.port);
  
}
bootstrap();
