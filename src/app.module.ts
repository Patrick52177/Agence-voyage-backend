import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CircuitsController } from './circuits/circuits.controller';
import { CircuitsService } from './circuits/circuits.service';
import { Circuit } from './circuits/entities/circuits.entity';
import { LeadsController } from './leads/leads.controller';
import { LeadsService } from './leads/leads.service';
import { Lead } from './leads/entities/lead.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // charge les variables d'environnement
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Circuit, Lead],
      synchronize: true, // true pour dev, false en prod
    }),
    TypeOrmModule.forFeature([Circuit, Lead]),
  ],
  controllers: [CircuitsController, LeadsController],
  providers: [CircuitsService, LeadsService],
})
export class AppModule {}
