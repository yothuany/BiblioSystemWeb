import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Categoria extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100 
  })
  nome!: string;

  @Column({
    type: 'text',
    nullable: true 
  })
  descricao!: string;

}