import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // validation 적용
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: true, //여기에 url을 넣어도된다.
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
