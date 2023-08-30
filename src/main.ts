import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_MQ_HOSTS],
      queue: 'logs',
      queueOptions: {
        durable: false,
      },
    },
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Bookstore API')
    .setDescription('API documentation for the Bookstore application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.startAllMicroservices(); // Start listening to the microservice
  await app.listen(3000);
}
bootstrap();
