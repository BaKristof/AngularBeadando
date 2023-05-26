import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Bejelentkezes {
  @Column()
  email: string;

  @Column()
  jelszo: string;

  @Column()
  hasznal: boolean;
}
