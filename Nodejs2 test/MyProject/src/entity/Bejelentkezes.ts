import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Bejelentkezes {
  @PrimaryColumn()
  id: number;
  
  @Column()
  email: string;

  @Column()
  jelszo: string;

  @Column()
  hasznal: boolean;
}
