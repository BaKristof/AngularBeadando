import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Active {
  @PrimaryColumn()
  Komp: string;
}
