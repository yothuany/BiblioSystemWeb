import { Controller, Get, Render } from "@nestjs/common";
import { EmprestimoService } from "./emprestimo.service";

@Controller('emprestimos')
export class EmprestimoController {

    constructor(private emprestimoService: EmprestimoService) {}

    @Get()
    @Render('emprestimo/inicial')
    async inicial(): Promise<object> {
        const emprestimos = await this.emprestimoService.findAll();

        return {
            titulo: 'Consulta de Empréstimos',
            emprestimos
        }
    }
}