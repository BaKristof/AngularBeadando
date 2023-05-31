import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Hiba {
  @PrimaryColumn()
  id: number;
  
  @Column()
  Komponens: string;

  @Column()
  Adat: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Idopillanat: Date;

}
