import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async function () {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('/api');

  app.use('/live', (_req, res) => {
    res.json({ status: true });
  });

  const apiConfig = new DocumentBuilder().setTitle('Poke - Fight').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, apiConfig);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
})();
