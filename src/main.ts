import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);

  SwaggerModule.setup('doc', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(PORT).then(() => {
    console.log(`
      🚀  Server is running!
      🔉  Listening on port ${PORT}
      📭  Start work at http://localhost:${PORT}/doc
    `);
  });
}
bootstrap();
