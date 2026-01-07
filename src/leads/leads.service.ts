// src/leads/leads.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto/create-lead.dto'

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepo: Repository<Lead>,
  ) {}

  async create(dto: CreateLeadDto) {
    const lead = this.leadRepo.create({
      ...dto,
      source: 'FORM',
    });

    await this.leadRepo.save(lead);

    return {
      success: true,
      message: 'Lead enregistré avec succès',
    };
  }

  findAll() {
    return this.leadRepo.find({
      order: { createdAt: 'DESC' },
    });
  }
}
