import { Controller, Get, Render } from "@nestjs/common";
import { MembroService } from "./membro.service";

@Controller('membros')
export class MembroController {

    constructor(private membroService: MembroService) {}

    @Get()
    @Render('membro/inicial')
    async inicial(): Promise<object> {
        const membros = await this.membroService.findAll();

        return {
            titulo: 'Consulta de Membros',
            membros
        }
    }
}