import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CircuitsService } from './circuits.service';
import { CircuitsController } from './circuits.controller';
import { Circuit } from './entities/circuits.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Circuit]),
    CloudinaryModule, // ✅ Ajouté
  ],
  controllers: [CircuitsController],
  providers: [CircuitsService],
})
export class CircuitsModule {}