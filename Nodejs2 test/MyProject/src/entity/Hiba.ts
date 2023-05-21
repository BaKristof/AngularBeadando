import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hiba {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Komponens: string;

  @Column()
  Adat: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Idopillanat: Date;
}
