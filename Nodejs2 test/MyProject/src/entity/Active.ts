import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Active {
  @Column()
  Komp: string;
  @PrimaryColumn()
  id: number;
}