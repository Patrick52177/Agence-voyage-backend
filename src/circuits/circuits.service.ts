import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Circuit } from './entities/circuits.entity';
import { CreateCircuitDto } from './dto/create-circuit.dto';

@Injectable()
export class CircuitsService {
  constructor(
    @InjectRepository(Circuit)
    private readonly circuitRepo: Repository<Circuit>,
  ) {}

  /* ============================
     CREATE
  ============================ */
  create(dto: CreateCircuitDto) {
    const circuit = this.circuitRepo.create(dto);
    return this.circuitRepo.save(circuit);
  }

  /* ============================
     HOME → 3 circuits
  ============================ */
  async findHomeCircuits() {
    return this.circuitRepo.find({
      where: { isActive: true },
      select: [
        'id',
        'title',
        'description',
        'duration',
        'destination',
        'theme',
        'region',
        'image',
      ],
      order: { id: 'DESC' },
      take: 3,
    });
  }

  /* ============================
     ALL + FILTERS
  ============================ */
  async findAllFiltered(region?: string, theme?: string) {
    const query = this.circuitRepo
      .createQueryBuilder('circuit')
      .where('circuit.isActive = :active', { active: true });

    if (region) {
      query.andWhere('circuit.region = :region', { region });
    }

    if (theme) {
      query.andWhere('circuit.theme = :theme', { theme });
    }

    return query
      .orderBy('circuit.id', 'DESC')
      .getMany();
  }

  /* ============================
     DETAIL
  ============================ */
  async findOne(id: number) {
    const circuit = await this.circuitRepo.findOne({
      where: { id, isActive: true },
    });

    if (!circuit) {
      throw new NotFoundException('Circuit introuvable');
    }

    return circuit;
  }

  /* ============================
     DELETE
  ============================ */
  remove(id: number) {
    return this.circuitRepo.delete(id);
  }
}
