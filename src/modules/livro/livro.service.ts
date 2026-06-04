import { Injectable } from "@nestjs/common";
import { Livro } from "./livro.entity";

@Injectable()
export class LivroService {     
    async findAll(): Promise<Livro[]> {
        return Livro.find();
    }
}