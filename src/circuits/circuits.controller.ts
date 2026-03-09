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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CircuitsService } from './circuits.service';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('circuits')
export class CircuitsController {
  constructor(
    private readonly circuitsService: CircuitsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /* ============================
     CREATE avec images
     POST /circuits
  ============================ */
  @Post()
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @Body() dto: CreateCircuitDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    let imageUrls: string[] = [];

    if (files && files.length > 0) {
      imageUrls = await Promise.all(
        files.map(file => this.cloudinaryService.uploadImage(file))
      );
    }

    return this.circuitsService.create({
      ...dto,
      image: imageUrls[0] ?? dto.image ?? null,
      images: imageUrls.length > 0 ? imageUrls : [],
    });
  }

  /* ============================
     UPDATE avec images
     PUT /circuits/:id
  ============================ */
  @Put(':id')
  @UseInterceptors(FilesInterceptor('images', 10))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCircuitDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    let newImageUrls: string[] = [];

    if (files && files.length > 0) {
      newImageUrls = await Promise.all(
        files.map(file => this.cloudinaryService.uploadImage(file))
      );
    }

    // ✅ Images existantes conservées + nouvelles combinées
    const existingImages = dto.existingImages
      ? JSON.parse(dto.existingImages)
      : [];

    const allImages = [...existingImages, ...newImageUrls];

    return this.circuitsService.update(id, {
      ...dto,
      image: allImages[0] ?? undefined,
      images: allImages,
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
     GET /circuits?region=&theme=&lang=
  ============================ */
  @Get()
  findAll(
    @Query('region') region?: string,
    @Query('theme') theme?: string,
    @Query('lang') lang?: string,
  ) {
    return this.circuitsService.findAllFiltered(region, theme, lang);
  }

  /* ============================
     DETAIL CIRCUIT
     GET /circuits/:id?lang=
  ============================ */
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('lang') lang?: string,
  ) {
    return this.circuitsService.findOne(id, lang);
  }

  /* ============================
     DELETE
  ============================ */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.circuitsService.remove(id);
  }
}