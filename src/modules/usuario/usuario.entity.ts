import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuarios')
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_usuario' })
    idUsuario!: number;

    @Column({ type: 'varchar', length: 150 })
    email!: string;

    @Column({ type: 'varchar', length: 200 })
    senha!: string;

    @Column({ name: 'Membro_id_membro', type: 'int' })
    membroIdMembro!: number;
}