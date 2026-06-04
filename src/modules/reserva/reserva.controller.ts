import { Controller, Get, Render } from "@nestjs/common";
import { ReservaService } from "./reserva.service";

@Controller('reservas')
export class ReservaController {

    constructor(private reservaService: ReservaService) {}

    @Get()
    @Render('reserva/inicial')
    async inicial(): Promise<object> {
        const reservas = await this.reservaService.findAll();

        return {
            titulo: 'Consulta de Reservas',
            reservas
        }
    }
}