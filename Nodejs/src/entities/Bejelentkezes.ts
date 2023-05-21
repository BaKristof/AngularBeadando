import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Bejelentkezes {
  @PrimaryColumn()
  email: string;

  @Column()
  jelszo: string;

  @Column()
  hasznal: boolean;
}
