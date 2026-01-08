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
  host: process.env.DB_HOST,        // Supabase host
  port: Number(process.env.DB_PORT),// 5432
  username: process.env.DB_USER,    // postgres
  password: process.env.DB_PASSWORD,// ton mot de passe Supabase
  database: process.env.DB_NAME,    // postgres
  entities: [Circuit, Lead],
  synchronize: true,                // seulement dev/test
  ssl: {
    rejectUnauthorized: false,      // SSL obligatoire pour Supabase
  },
  extra: {
    // FORCE IPv4 sinon Render essaie IPv6 et ça casse
    host: process.env.DB_HOST, 
    family: 4
  },
}),
    TypeOrmModule.forFeature([Circuit, Lead]),
  ],
  controllers: [CircuitsController, LeadsController],
  providers: [CircuitsService, LeadsService],
})
export class AppModule {}
