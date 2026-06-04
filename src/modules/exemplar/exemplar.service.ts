import { Injectable } from "@nestjs/common";
import { Exemplar } from "./exemplar.entity";

@Injectable()
export class ExemplarService {     
    async findAll(): Promise<Exemplar[]> {
        return Exemplar.find();
    }
}