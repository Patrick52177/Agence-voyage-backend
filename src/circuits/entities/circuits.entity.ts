import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface TranslatedField {
  fr: string;
  en: string;
  es: string;
}

export interface TranslatedArray {
  fr: string[];
  en: string[];
  es: string[];
}

export interface ItineraryDay {
  day: number;
  title: TranslatedField;
  description: TranslatedField;
  accommodation?: string;
}

@Entity('circuits')
export class Circuit {
  @PrimaryGeneratedColumn()
  id: number;

  // ===== CHAMPS MULTILINGUES =====
  @Column({ type: 'jsonb' })
  title: TranslatedField;

  @Column({ type: 'jsonb' })
  description: TranslatedField;

  @Column({ type: 'jsonb', nullable: true })
  bestPeriod: TranslatedField;

  @Column({ type: 'jsonb', nullable: true })
  travelerType: TranslatedField;

  @Column({ type: 'jsonb', nullable: true })
  idealFor: TranslatedField;

  @Column({ type: 'jsonb', nullable: true })
  priceNote: TranslatedField;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: '{"fr":[],"en":[],"es":[]}',
  })
  highlights: TranslatedArray;

  @Column({ type: 'jsonb', nullable: true, default: '[]' })
  itinerary: ItineraryDay[];

  @Column({
    type: 'jsonb',
    nullable: true,
    default: '{"fr":[],"en":[],"es":[]}',
  })
  included: TranslatedArray;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: '{"fr":[],"en":[],"es":[]}',
  })
  notIncluded: TranslatedArray;

  // ===== CHAMPS COMMUNS =====
  @Column()
  duration: string;

  @Column()
  destination: string;

  @Column()
  theme: string;

  @Column()
  region: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'jsonb', nullable: true, default: '[]' })
  images: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pricePerPerson: number;

  @Column({ default: true })
  isActive: boolean;
}
