// src/leads/entities/lead.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: string; // WhatsApp

  @Column()
  country: string;

  @Column({ nullable: true }) // rendre ce champs optionnel
  startDate: string;

  @Column({ nullable: true }) // rendre ce champs optionnel
  duration: string;

  @Column({ nullable: true }) // rendre ce champs optionnel
  budget: string;

  @Column({ nullable: true }) // rendre ce champs optionnel
  theme: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ default: 'FORM' })
  source: 'FORM' | 'WHATSAPP';

  @CreateDateColumn()
  createdAt: Date;
}
