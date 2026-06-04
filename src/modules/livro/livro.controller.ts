import { Controller, Get, Render } from "@nestjs/common";
import { LivroService } from "./livro.service";

@Controller('livros')
export class LivroController {

    constructor(private livroService: LivroService) {}

    @Get()
    @Render('livro/inicial')
    async inicial(): Promise<object> {
        const livros = await this.livroService.findAll();

        return {
            titulo: 'Consulta de Livros',
            livros
        }
    }
}