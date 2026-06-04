import { Controller, Get, Render } from "@nestjs/common";
import { ExemplarService } from "./exemplar.service";

@Controller('exemplares')
export class ExemplarController {

    constructor(private exemplarService: ExemplarService) {}

    @Get()
    @Render('exemplar/inicial')
    async inicial(): Promise<object> {
        const exemplares = await this.exemplarService.findAll();

        return {
            titulo: 'Consulta de Exemplares',
            exemplares
        }
    }
}