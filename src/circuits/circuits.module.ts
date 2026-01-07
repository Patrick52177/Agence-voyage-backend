import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CircuitsService } from './circuits.service';
import { CircuitsController } from './circuits.controller';
import { Circuit } from './entities/circuits.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Circuit])],
  controllers: [CircuitsController],
  providers: [CircuitsService],
})
export class CircuitsModule {}
