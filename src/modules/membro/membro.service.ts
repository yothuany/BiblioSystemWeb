import { Injectable } from "@nestjs/common";
import { Like } from "typeorm"; 
import { Membro } from "./membro.entity";
import { CreateMembroDto } from "./dtos/create-membro.dto";
import { UpdateMembroDto } from "./dtos/update-membro.dto";

@Injectable()
export class MembroService {

    async findAll(termoBusca?: string): Promise<Membro[]> {
        if (termoBusca) {
            return Membro.find({
                where: [
                    { nome: Like(`%${termoBusca}%`) },
                    { cpf: Like(`%${termoBusca}%`) }
                ]
            });
        }
        return Membro.find();
    }

    async findOne(id: number): Promise<Membro | null> {
        return Membro.findOne({
            where: { id }
        });
    }

    async create(dados: CreateMembroDto): Promise<Membro> {
        const membro = Membro.create({ ...dados });
        return membro.save();
    }

    async update(id: number, dados: UpdateMembroDto): Promise<Membro | null> {
        const membro = await this.findOne(id);
        if (!membro) {
            return null;
        }
        Object.assign(membro, { ...dados });
        return membro.save(); 
    }

    async remove(id: number): Promise<Membro | null> {
        const membro = await this.findOne(id);
        if (!membro) {
            return null;
        }
        return membro.remove();
    }
}