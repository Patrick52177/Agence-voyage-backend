import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('circuits')
export class Circuit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  duration: string;

  @Column()
  destination: string;

  @Column()
  theme: string; // remplace price

  @Column()
  region: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  bestPeriod: string;

  @Column({ nullable: true })
  travelerType: string;

  @Column({ type: 'text', nullable: true })
  itinerary: string[];

  @Column({ type: 'text', nullable: true })
  included: string;

  @Column({ type: 'text', nullable: true })
  notIncluded: string;

  @Column({ default: true })
  isActive: boolean;
}
