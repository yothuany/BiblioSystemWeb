import { Injectable } from "@nestjs/common";
import { Membro } from "./membro.entity";

@Injectable()
export class MembroService {     
    async findAll(): Promise<Membro[]> {
        return Membro.find();
    }
}