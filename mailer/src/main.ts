import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'mailer',
        brokers: ['host.docker.internal:9094'],
      },
    },
  });
  app.startAllMicroservices().then(() => {
    console.log('[Mailer] microservice running');
  });
  app.listen(3000).then(() => {
    console.log('[Mailer] HTTP server running');
  });
}
bootstrap();
