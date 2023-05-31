import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Active {
  @PrimaryColumn()
  id: number;
  @Column()
  Komp: string;

}