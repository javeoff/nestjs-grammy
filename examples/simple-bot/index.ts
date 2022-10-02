import { NestFactory } from '@nestjs/core';

import { AppModule } from './AppModule';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  await app.listen(3_000);
}

void bootstrap();
