import { Injectable } from "@nestjs/common";
import { Categoria } from "./categoria.entity";

@Injectable()
export class CategoriaService {     
    async findAll(): Promise<Categoria[]> {
        return Categoria.find();
    }
}