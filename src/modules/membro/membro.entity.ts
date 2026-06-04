import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('membros')
export class Membro extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_membro' })
    idMembro!: number;

    @Column({ type: 'varchar', length: 100 })
    nome!: string;

    @Column({ type: 'varchar', length: 100 })
    email!: string;

    @Column({ type: 'varchar', length: 15 })
    telefone!: string;

    @Column({ type: 'varchar', length: 45 })
    cpf!: string;

    @Column({ name: 'data_cadastro', type: 'date' })
    dataCadastro!: Date;
}