import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CircuitsService } from './circuits.service';
import { CreateCircuitDto } from './dto/create-circuit.dto';

@Controller('circuits')
export class CircuitsController {
  constructor(private readonly circuitsService: CircuitsService) {}

  /* ============================
     CREATE
  ============================ */
  @Post()
  create(@Body() dto: CreateCircuitDto) {
    return this.circuitsService.create(dto);
  }

  /* ============================
     HOME PAGE → 3 circuits max
     GET /circuits/home
  ============================ */
  @Get('home')
  findHomeCircuits() {
    return this.circuitsService.findHomeCircuits();
  }

  /* ============================
     PAGE CIRCUITS + FILTRES
     GET /circuits?region=&theme=
  ============================ */
  @Get()
  findAll(
    @Query('region') region?: string,
    @Query('theme') theme?: string,
  ) {
    return this.circuitsService.findAllFiltered(region, theme);
  }

  /* ============================
     DETAIL CIRCUIT
     GET /circuits/:id
  ============================ */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.circuitsService.findOne(id);
  }

  /* ============================
     DELETE
  ============================ */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.circuitsService.remove(id);
  }
}
