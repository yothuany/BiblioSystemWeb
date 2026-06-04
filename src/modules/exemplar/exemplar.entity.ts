import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('exemplares')
export class Exemplar extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_exemplar' })
    idExemplar!: number;

    @Column({ type: 'varchar', length: 50 })
    codigo!: string;

    @Column({ type: 'varchar', length: 45 })
    status!: string;

    @Column({ name: 'Livro_id_livro', type: 'int' })
    livroIdLivro!: number;
}