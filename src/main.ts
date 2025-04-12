import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('LinKasa API Documentation')
    .setDescription('An API Documentation for LinKasa built using Swagger')
    .setVersion('1.0')
    .addTag('education').addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token', 
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  // app.use(express.urlencoded({ extended: true })); 
  // app.use(express.json());
  app.use(express.static("uploads"));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
