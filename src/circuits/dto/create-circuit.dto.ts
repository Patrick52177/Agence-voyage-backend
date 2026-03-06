import { IsString, IsArray, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCircuitDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;

  @IsString()
  destination: string;

  @IsString()
  theme: string;

  @IsString()
  region: string;

  // ✅ image gérée par Cloudinary — pas obligatoire dans le body
  // create-circuit.dto.ts
  @IsOptional()
@IsString()
image?: string;

@IsOptional()
@IsArray()
images?: string[];
  @IsOptional()
  @IsString()
  bestPeriod?: string;

  @IsOptional()
  @IsString()
  travelerType?: string;

  @IsOptional()
  @IsString()
  idealFor?: string;

  @IsOptional()
  @IsString()
  priceNote?: string;

  // ✅ FormData envoie les nombres en string — Transform les convertit
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  pricePerPerson?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // ✅ FormData envoie les arrays en JSON string — Transform les parse
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try { return JSON.parse(value); } catch { return []; }
    }
    return value;
  })
  @IsArray()
  highlights?: string[];

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try { return JSON.parse(value); } catch { return []; }
    }
    return value;
  })
  @IsArray()
  itinerary?: {
    day: number;
    title: string;
    description: string;
    accommodation?: string;
  }[];

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try { return JSON.parse(value); } catch { return []; }
    }
    return value;
  })
  @IsArray()
  included?: string[];

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try { return JSON.parse(value); } catch { return []; }
    }
    return value;
  })
  @IsArray()
  notIncluded?: string[];

   @IsOptional()
  @IsString()
  existingImages?: string;
}

