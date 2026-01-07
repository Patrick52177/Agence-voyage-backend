// src/leads/dto/create-lead.dto.ts
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLeadDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  country: string;

  @IsOptional()
  startDate?: string;

  @IsOptional()
  duration?: string;

  @IsOptional()
  budget?: string;

  @IsOptional()
  theme?: string;

  @IsOptional()
  message?: string;
}
