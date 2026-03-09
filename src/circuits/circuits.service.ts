import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Circuit } from './entities/circuits.entity';

@Injectable()
export class CircuitsService {
  constructor(
    @InjectRepository(Circuit)
    private readonly circuitRepo: Repository<Circuit>,
  ) {}

  // ✅ Helper — extrait la bonne langue d'un champ traduit
  private translate(field: any, lang: string): any {
    if (!field || typeof field !== 'object') return field;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return field[lang] ?? field['fr'] ?? '';
  }

  // ✅ Helper — traduit un circuit complet
  private translateCircuit(circuit: Circuit, lang: string) {
    return {
      ...circuit,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      title:       this.translate(circuit.title, lang),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      description: this.translate(circuit.description, lang),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      bestPeriod: this.translate(circuit.bestPeriod, lang),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      travelerType: this.translate(circuit.travelerType, lang),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      idealFor: this.translate(circuit.idealFor, lang),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      priceNote:   this.translate(circuit.priceNote, lang),
      highlights:  circuit.highlights ? (circuit.highlights[lang] ?? circuit.highlights['fr'] ?? []) : [],
      included:    circuit.included   ? (circuit.included[lang]   ?? circuit.included['fr']   ?? []) : [],
      notIncluded: circuit.notIncluded? (circuit.notIncluded[lang] ?? circuit.notIncluded['fr'] ?? []) : [],
      itinerary:   circuit.itinerary  ? circuit.itinerary.map(day => ({
        ...day,
        title:       this.translate(day.title, lang),
        description: this.translate(day.description, lang),
      })) : [],
    };
  }

  /* ============================
     CREATE
  ============================ */
  create(dto: Partial<Circuit>) {
    const circuit = this.circuitRepo.create(dto);
    return this.circuitRepo.save(circuit);
  }

  /* ============================
     UPDATE
  ============================ */
  async update(id: number, dto: Partial<Circuit>) {
    const circuit = await this.circuitRepo.findOne({ where: { id } });

    if (!circuit) {
      throw new NotFoundException('Circuit introuvable');
    }

    Object.assign(circuit, dto);
    return this.circuitRepo.save(circuit);
  }

  /* ============================
     HOME → 3 circuits
  ============================ */
  async findHomeCircuits(lang: string = 'fr') {
    const circuits = await this.circuitRepo.find({
      where: { isActive: true },
      order: { id: 'DESC' },
      take: 3,
    });

    return circuits.map(c => this.translateCircuit(c, lang));
  }

  /* ============================
     ALL + FILTERS
  ============================ */
  async findAllFiltered(region?: string, theme?: string, lang: string = 'fr') {
    const query = this.circuitRepo
      .createQueryBuilder('circuit')
      .where('circuit.isActive = :active', { active: true });

    if (region) {
      query.andWhere('circuit.region = :region', { region });
    }

    if (theme) {
      query.andWhere('circuit.theme = :theme', { theme });
    }

    const circuits = await query.orderBy('circuit.id', 'DESC').getMany();
    return circuits.map(c => this.translateCircuit(c, lang));
  }

  /* ============================
     DETAIL
  ============================ */
  async findOne(id: number, lang: string = 'fr') {
    const circuit = await this.circuitRepo.findOne({
      where: { id, isActive: true },
    });

    if (!circuit) {
      throw new NotFoundException('Circuit introuvable');
    }

    return this.translateCircuit(circuit, lang);
  }

  /* ============================
     DELETE
  ============================ */
  remove(id: number) {
    return this.circuitRepo.delete(id);
  }
}