import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './mongoose/filters/AllExceptionError.filter';
import { MongoExceptionFilter } from './mongoose/filters/MongoError.filter';
import { ValidationErrorFilter } from './mongoose/filters/ValidationError.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalFilters(new ValidationErrorFilter());

  // app.setGlobalPrefix('api');
  const tag = 'Skeleton';
  const title = `NodeJS NestJS ${tag}`;
  const description = `The ${title} description`;

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion('1.0')
    .addTag(tag)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
