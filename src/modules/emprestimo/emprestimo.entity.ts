import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('emprestimos')
export class Emprestimo extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_emprestimo' })
    idEmprestimo!: number;

    @Column({ name: 'data_emprestimo', type: 'date' })
    dataEmprestimo!: Date;

    @Column({ name: 'data_prevista_devolucao', type: 'date' })
    dataPrevistaDevolucao!: Date;

    @Column({ name: 'data_devolucao', type: 'date', nullable: true })
    dataDevolucao!: Date;

    @Column({ name: 'valor_multa', type: 'decimal', precision: 10, scale: 2, nullable: true })
    valorMulta!: number;

    @Column({ name: 'Membro_id_membro', type: 'int' })
    membroIdMembro!: number;

    @Column({ name: 'Exemplar_id_exemplar', type: 'int' })
    exemplarIdExemplar!: number;
}