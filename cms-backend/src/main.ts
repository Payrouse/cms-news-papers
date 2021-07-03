import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // active validations to DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // don't receive incorrect attributes from client request (only DTO attributes)
      forbidNonWhitelisted: true, // return error if endpoint receive an incorrect attribute
    }),
  );
  // active serializer
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
