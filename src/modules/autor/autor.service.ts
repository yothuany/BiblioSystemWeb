import { Injectable } from "@nestjs/common";
import { Like } from "typeorm"; 
import { Autor } from "./autor.entity";
import { CreateAutorDto } from "./dtos/create-autor.dto";
import { UpdateAutorDto } from "./dtos/update-autor.dto";

@Injectable()
export class AutorService {

    async findAll(termoBusca?: string): Promise<Autor[]> {
        if (termoBusca) {
            return Autor.find({
                where: {
                    nome: Like(`%${termoBusca}%`) 
                }
            });
        }

        return Autor.find();
    }

    async findOne(id: number): Promise<Autor | null> {
        return Autor.findOne({
            where: { id }
        });
    }

    async create(dados: CreateAutorDto): Promise<Autor> {
        const autor = Autor.create({ ...dados });
        return autor.save();
    }

    async update(id: number, dados: UpdateAutorDto): Promise<Autor | null> {
        const autor = await this.findOne(id);
        if (!autor) {
            return null;
        }
        Object.assign(autor, { ...dados });
        return autor.save(); 
    }

    async remove(id: number): Promise<Autor | null> {
        const autor = await this.findOne(id);
        if (!autor) {
            return null;
        }
        return autor.remove();
    }
}