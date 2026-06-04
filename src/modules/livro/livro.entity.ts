import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('livros')
export class Livro extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_livro' })
    idLivro!: number;

    @Column({ type: 'varchar', length: 200 })
    titulo!: string;

    @Column({ type: 'varchar', length: 50 })
    isbn!: string;

    @Column({ name: 'ano_publicacao', type: 'int' })
    anoPublicacao!: number;

    @Column({ type: 'varchar', length: 100 })
    editora!: string;
}