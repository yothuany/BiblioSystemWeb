import { Injectable } from "@nestjs/common";
import { Autor } from "./autor.entity";

@Injectable()
export class AutorService {     
    async findAll(): Promise<Autor[]> {
        return Autor.find();
    }
}