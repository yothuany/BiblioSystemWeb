import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Autor } from '../autor/autor.entity';
import { Categoria } from '../categoria/categoria.entity';

@Entity('livro') // Garante que aponta para a tabela minúscula
export class Livro extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  titulo!: string;

  @Column({ length: 200, unique: true })
  isbn!: string;

  @Column({ name: 'ano_publicacao', type: 'int' })
  anoPublicacao!: number;

  @Column({ length: 100 })
  editora!: string;

  // Relação ManyToMany com Autores com carregamento automático (eager)
  @ManyToMany(() => Autor, { eager: true })
  @JoinTable({
    name: 'livro_autores_autor', // Nome exato da tabela pivô no banco
    joinColumn: { name: 'livroId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'autorId', referencedColumnName: 'id' }
  })
  autores!: Autor[];

  // Relação ManyToMany com Categorias com carregamento automático (eager)
  @ManyToMany(() => Categoria, { eager: true })
  @JoinTable({
    name: 'livro_categorias_categoria', // Nome exato da tabela pivô no banco
    joinColumn: { name: 'livroId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoriaId', referencedColumnName: 'id' }
  })
  categorias!: Categoria[];
}