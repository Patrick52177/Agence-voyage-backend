import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Crée l'app NestJS
  const app = await NestFactory.create(AppModule);

  // Active la validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // supprime les champs inconnus
      forbidNonWhitelisted: true,  // erreur si champ non prévu
      transform: true,             // transforme JSON → DTO
    }),
  );

  // Active CORS pour ton frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'https://agence-voyage-frontend-rmnf.vercel.app/', // remplace '*' par ton URL Vercel pour plus de sécurité
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Écoute sur le port fourni par l'environnement (Heroku/Render)
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend démarré sur le port ${port}`);
}

bootstrap();
