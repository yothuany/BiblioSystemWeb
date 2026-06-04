import { Controller, Get, Render } from "@nestjs/common";
import { AutorService } from "./autor.service";

@Controller('autores')
export class AutorController {

    constructor(private autorService: AutorService) {}

    @Get()
    @Render('autor/inicial')
    async inicial(): Promise<object> {
        const autores = await this.autorService.findAll();

        return {
            titulo: 'Consulta de Autores',
            autores
        }
    }
}