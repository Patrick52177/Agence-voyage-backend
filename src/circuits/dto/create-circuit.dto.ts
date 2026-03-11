import {
  IsString,
  IsArray,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsObject,
} from 'class-validator';
import { Transform } from 'class-transformer';

// ✅ Helper pour parser les champs JSON depuis FormData
const parseJson = (value: any) => {
  if (typeof value === 'string') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return value;
};

export class CreateCircuitDto {
  // ===== CHAMPS MULTILINGUES =====
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => parseJson(value))
  @IsObject()
  title: { fr: string; en: string; es: string };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => parseJson(value))
  @IsObject()
  description: { fr: string; en: string; es: string };

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => parseJson(value))
  @IsObject()
  bestPeriod?: { fr: string; en: string; es: string };

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => parseJson(value))
  @IsObject()
  travelerType?: { fr: string; en: string; es: string };

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => parseJson(value))
  @IsObject()
  idealFor?: { fr: string; en: string; es: string };

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => parseJson(value))
  @IsObject()
  priceNote?: { fr: string; en: string; es: string };

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => parseJson(value))
  @IsObject()
  highlights?: { fr: string[]; en: string[]; es: string[] };

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => parseJson(value))
  @IsArray()
  itinerary?: {
    day: number;
    title: { fr: string; en: string; es: string };
    description: { fr: string; en: string; es: string };
    accommodation?: string;
  }[];

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => parseJson(value))
  @IsObject()
  included?: { fr: string[]; en: string[]; es: string[] };

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => parseJson(value))
  @IsObject()
  notIncluded?: { fr: string[]; en: string[]; es: string[] };

  // ===== CHAMPS COMMUNS =====
  @IsString()
  duration: string;

  @IsString()
  destination: string;

  @IsString()
  theme: string;

  @IsString()
  region: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => parseJson(value))
  @IsArray()
  images?: string[];

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  pricePerPerson?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  existingImages?: string;
}
