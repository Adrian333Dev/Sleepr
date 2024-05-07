import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes properties from request body that are not in the DTO
      forbidNonWhitelisted: true, // throws an error if a property that is not in the DTO is sent
      transform: true, // transforms the request body or params to the DTO type
      transformOptions: {
        enableImplicitConversion: true, // converts the request body or params to the DTO type
      },
    }),
  );
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
