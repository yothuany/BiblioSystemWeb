import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Autor extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 150
  })
  nome!: string;

  @Column({
    type: 'text'
  })
  biografia!: string;

}