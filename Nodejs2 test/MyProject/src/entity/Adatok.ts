import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Adatok {
  @Column()
  Komponens: string;

  @Column()
  Adat: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Felvet: Date;
  @PrimaryColumn()
  id: number;
}
