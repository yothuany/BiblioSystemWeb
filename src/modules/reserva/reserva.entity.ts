import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('reservas')
export class Reserva extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_reserva' })
    idReserva!: number;

    @Column({ name: 'data_reserva', type: 'date' })
    dataReserva!: Date;

    @Column({ type: 'varchar', length: 45 })
    status!: string;

    @Column({ name: 'Membro_id_membro', type: 'int' })
    membroIdMembro!: number;

    @Column({ name: 'Livro_id_livro', type: 'int' })
    livroIdLivro!: number;
}