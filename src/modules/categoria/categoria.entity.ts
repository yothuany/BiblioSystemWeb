import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categorias')
export class Categoria extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_categoria' })
    idCategoria!: number;

    @Column({ type: 'varchar', length: 100 })
    nome!: string;

    @Column({ type: 'text' })
    descricao!: string;
}