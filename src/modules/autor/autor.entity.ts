import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('autores')
export class Autor extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_autor' })
    idAutor!: number;

    @Column({ type: 'varchar', length: 100 })
    nome!: string;

    @Column({ type: 'text' })
    biografia!: string;
}