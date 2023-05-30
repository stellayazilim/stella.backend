import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().set('json spaces', 2);
  app.enableCors({
    origin: [/.+/],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
