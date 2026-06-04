import { Controller, Get, Render } from "@nestjs/common";
import { CategoriaService } from "./categoria.service";

@Controller('categorias')
export class CategoriaController {

    constructor(private categoriaService: CategoriaService) {}

    @Get()
    @Render('categoria/inicial')
    async inicial(): Promise<object> {
        const categorias = await this.categoriaService.findAll();

        return {
            titulo: 'Consulta de Categorias',
            categorias
        }
    }
}