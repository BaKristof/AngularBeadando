import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Adatok {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Komponens: string;

  @Column()
  Adat: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Felvet: Date;

}
