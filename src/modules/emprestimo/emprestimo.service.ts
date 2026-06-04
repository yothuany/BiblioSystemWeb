import { Injectable } from "@nestjs/common";
import { Emprestimo } from "./emprestimo.entity";

@Injectable()
export class EmprestimoService {     
    async findAll(): Promise<Emprestimo[]> {
        return Emprestimo.find();
    }
}