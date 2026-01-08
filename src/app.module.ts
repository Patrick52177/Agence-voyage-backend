import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CircuitsController } from './circuits/circuits.controller';
import { CircuitsService } from './circuits/circuits.service';
import { Circuit } from './circuits/entities/circuits.entity';
import { LeadsController } from './leads/leads.controller';
import { LeadsService } from './leads/leads.service';
import { Lead } from './leads/entities/lead.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Circuit, Lead],
      synchronize: true, // pour dev/test uniquement
    }),
    TypeOrmModule.forFeature([Circuit, Lead]),
  ],
  controllers: [CircuitsController, LeadsController],
  providers: [CircuitsService, LeadsService],
})
export class AppModule {}
