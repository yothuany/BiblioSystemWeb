import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Membro } from '../membro/membro.entity';
import { Exemplar } from '../exemplar/exemplar.entity';

@Entity('emprestimo')
export class Emprestimo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  data_emprestimo!: string;

  @Column({ type: 'date' })
  data_prevista_devolucao!: string;

  @Column({ type: 'date', nullable: true })
  data_devolucao?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  valor_multa!: number;

  @Column({ type: 'varchar', length: 45, default: 'Ativo' })
  status!: string;

  @Column()
  membroId!: number;

  @Column()
  exemplarId!: number;

  @ManyToOne(() => Membro, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'membroId' })
  membro!: Membro;

  @ManyToOne(() => Exemplar, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exemplarId' })
  exemplar!: Exemplar;
}