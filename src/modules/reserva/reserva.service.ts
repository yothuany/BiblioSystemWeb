import { Injectable } from "@nestjs/common";
import { Reserva } from "./reserva.entity";

@Injectable()
export class ReservaService {     
    async findAll(): Promise<Reserva[]> {
        return Reserva.find();
    }
}