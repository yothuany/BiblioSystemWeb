import { Injectable } from "@nestjs/common";
import { Like } from "typeorm"; 
import { Categoria } from "./categoria.entity";
import { CreateCategoriaDto } from "./dtos/create-categoria.dto";
import { UpdateCategoriaDto } from "./dtos/update-categoria.dto";

@Injectable()
export class CategoriaService {

   // O parâmetro termoBusca precisa estar aqui
    async findAll(termoBusca?: string): Promise<Categoria[]> {
        if (termoBusca) {
            return Categoria.find({
                where: {
                    nome: Like(`%${termoBusca}%`) // Garante que busca por qualquer parte do nome
                }
            });
        }

        return Categoria.find();
    }

    async findOne(id: number): Promise<Categoria | null> {
        return Categoria.findOne({
            where: { id }
        });
    }

    async create(dados: CreateCategoriaDto): Promise<Categoria> {
        const categoria = Categoria.create({ ...dados });
        return categoria.save();
    }

    async update(id: number, dados: UpdateCategoriaDto): Promise<Categoria | null> {
        const categoria = await this.findOne(id);
        if (!categoria) {
            return null;
        }
        Object.assign(categoria, { ...dados });
        return categoria.save(); 
    }

    async remove(id: number): Promise<Categoria | null> {
        const categoria = await this.findOne(id);
        if (!categoria) {
            return null;
        }
        return categoria.remove();
    }
}