import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CircuitsService } from './circuits.service';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('circuits')
export class CircuitsController {
  constructor(
    private readonly circuitsService: CircuitsService,
    private readonly cloudinaryService: CloudinaryService, // ✅ Ajouté
  ) {}

  /* ============================
     CREATE avec image
     POST /circuits
  ============================ */
  @Post()
  @UseInterceptors(FileInterceptor('image')) // ✅ intercepte le fichier image
  async create(
    @Body() dto: CreateCircuitDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;

    // ✅ Si une image est envoyée, on l'upload sur Cloudinary
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }

    return this.circuitsService.create({
      ...dto,
      image: imageUrl,
    });
  }

  /* ============================
     UPDATE avec image
     PUT /circuits/:id
  ============================ */
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCircuitDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let imageUrl: string | undefined;

    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }

    return this.circuitsService.update(id, {
      ...dto,
      // ✅ On ne remplace l'image que si une nouvelle est envoyée
      ...(imageUrl && { image: imageUrl }),
    });
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