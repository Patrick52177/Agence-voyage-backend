import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Circuit } from './circuits/entities/circuits.entity';
import { Lead } from './leads/entities/lead.entity';

// ✅ Importe les modules complets au lieu des controllers/services directement
import { CircuitsModule } from './circuits/circuits.module';
import { LeadsModule } from './leads/leads.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Circuit, Lead],
      synchronize: true,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      extra: process.env.DB_SSL === 'true' ? { family: 4 } : {},
    }),
    // ✅ Modules complets
    CircuitsModule,
    CloudinaryModule,
    LeadsModule,
  ],
  // ✅ Plus besoin de lister les controllers et providers ici
  controllers: [],
  providers: [],
})
export class AppModule {}