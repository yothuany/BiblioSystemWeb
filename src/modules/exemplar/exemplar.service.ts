import { Injectable } from "@nestjs/common";
import { Like } from "typeorm";
import { Exemplar } from "./exemplar.entity";
import { CreateExemplarDto } from "./dtos/create-exemplar.dto";
import { UpdateExemplarDto } from "./dtos/update-exemplar.dto";

@Injectable()
export class ExemplarService {

    async findAll(termoBusca?: string): Promise<Exemplar[]> {
        if (termoBusca) {
            return Exemplar.find({
                where: { codigo: Like(`%${termoBusca}%`) },
                relations: { livro: true }
            });
        }
        return Exemplar.find({ relations: { livro: true } });
    }

    async findOne(id: number): Promise<Exemplar | null> {
        return Exemplar.findOne({
            where: { id },
            relations: { livro: true }
        });
    }

    async create(dados: CreateExemplarDto): Promise<Exemplar> {
        const exemplar = Exemplar.create({ ...dados });
        return exemplar.save();
    }

    async update(id: number, dados: UpdateExemplarDto): Promise<Exemplar | null> {
        const exemplar = await this.findOne(id);
        if (!exemplar) return null;
        Object.assign(exemplar, { ...dados });
        return exemplar.save();
    }

    async remove(id: number): Promise<Exemplar | null> {
        const exemplar = await this.findOne(id);
        if (!exemplar) return null;
        return exemplar.remove();
    }
}