import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('circuits')
export class Circuit {
  @PrimaryGeneratedColumn()
  id: number;

  // ===== INFOS DE BASE =====
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  duration: string; // "10 jours / 9 nuits"

  @Column()
  destination: string; // "Andasibe – Mantadia"

  @Column()
  theme: string;

  @Column()
  region: string;

  // ✅ image principale (1ère image)
  @Column({ nullable: true })
image: string;

// ✅ toutes les images
@Column({ type: 'simple-json', nullable: true })
images: string[];

  @Column({ nullable: true })
  bestPeriod: string;

  @Column({ nullable: true })
  travelerType: string; // "Amoureux de la nature, photographes"

  @Column({ nullable: true })
  idealFor: string; // "Éco-touristes, familles"

  @Column({ nullable: true })
  priceNote: string; // "Prix sur demande selon groupe"

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pricePerPerson: number;

  @Column({ default: true })
  isActive: boolean;

  // ===== HIGHLIGHTS =====
  // ✅ simple-json stocke un array directement en base
  @Column({ type: 'simple-json', nullable: true })
  highlights: string[];

  // ===== ITINÉRAIRE =====
  // ✅ Array d'objets {day, title, description, accommodation}
  @Column({ type: 'simple-json', nullable: true })
  itinerary: {
    day: number;
    title: string;
    description: string;
    accommodation?: string;
  }[];

  // ===== INCLUS / EXCLUS =====
  // ✅ Arrays de strings
  @Column({ type: 'simple-json', nullable: true })
  included: string[];

  @Column({ type: 'simple-json', nullable: true })
  notIncluded: string[];
}