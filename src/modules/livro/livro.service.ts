import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { Livro } from './livro.entity';
import { CreateLivroDto } from './dtos/create-livro.dto';
import { UpdateLivroDto } from './dtos/update-livro.dto';
import { Autor } from '../autor/autor.entity';
import { Categoria } from '../categoria/categoria.entity';

@Injectable()
export class LivroService {
  async findAll(termoBusca?: string): Promise<Livro[]> {
    if (termoBusca) {
      return Livro.find({
        where: {
          titulo: Like(`%${termoBusca}%`),
        },
      });
    }
    return Livro.find();
  }

  async findOne(id: number): Promise<Livro | null> {
    return Livro.findOne({
      where: { id },
    });
  }

  async create(dados: CreateLivroDto): Promise<Livro> {
    const libro = Livro.create({
      titulo: dados.titulo,
      isbn: dados.isbn,
      anoPublicacao: dados.anoPublicacao,
      editora: dados.editora,
      // Salva os relacionamentos na tabela pivô utilizando os IDs recebidos do DTO
      autores: [{ id: dados.autorId } as Autor],
      categorias: [{ id: dados.categoriaId } as Categoria],
    });
    return libro.save();
  }

  async update(id: number, dados: UpdateLivroDto): Promise<Livro | null> {
    const livro = await this.findOne(id);
    if (!livro) return null;

    livro.titulo = dados.titulo ?? livro.titulo;
    livro.isbn = dados.isbn ?? livro.isbn;
    livro.anoPublicacao = dados.anoPublicacao ?? livro.anoPublicacao;
    livro.editora = dados.editora ?? livro.editora;

    if (dados.autorId) {
      livro.autores = [{ id: dados.autorId } as Autor];
    }
    if (dados.categoriaId) {
      livro.categorias = [{ id: dados.categoriaId } as Categoria];
    }

    return livro.save();
  }

  async remove(id: number): Promise<Livro | null> {
    const livro = await this.findOne(id);
    if (!livro) return null;
    return livro.remove();
  }
}