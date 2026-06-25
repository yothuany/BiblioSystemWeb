import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Livro } from '../livro/livro.entity';

@Entity({ name: 'exemplar' })
export class Exemplar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 50 })
  codigo!: string;

  @Column({ length: 45, default: 'Disponível' })
  status!: string; // 'Disponível' ou 'Emprestado'

  @Column()
  livroId!: number;

  @ManyToOne(() => Livro, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'livroId' })
  livro!: Livro;
}