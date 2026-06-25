import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Membro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nome!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ length: 15 })
  telefone!: string;

  @Column({ length: 14, unique: true })
  cpf!: string;
}