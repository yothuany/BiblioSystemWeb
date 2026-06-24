import {
    Body,
    Controller,
    Get,
    Post,
    Redirect,
    Render,
    Param,
    HttpCode,
    Query
} from "@nestjs/common";
import {ValidationView} from "nest-validation-view";
import {CategoriaService} from "./categoria.service";
import {CreateCategoriaDto} from "./dtos/create-categoria.dto";
import {UpdateCategoriaDto} from "./dtos/update-categoria.dto";

@Controller('categorias')
export class CategoriaController {

    constructor(
        private categoriaService: CategoriaService
    ) {}

    @Get()
    @Render('categoria/inicial')
    async inicial(@Query('search') search?: string): Promise<object> {
        const listaCategorias = await this.categoriaService.findAll(search);

        return {
            titulo: 'Consulta de Categorias',
            categorias: listaCategorias,
            termoPesquisado: search || '' // <-- IMPORTANTE: Esse nome precisa bater com o value do input na View
        };
    }

    @Get('criar')
    @Render('categoria/formulario')
    async formularioCriar(): Promise<object> {
        return {
            titulo: 'Nova Categoria'
        };
    }

    @Post('criar')
    @Redirect('/categorias')
    @ValidationView('categoria/formulario', ({ request, errors }) => ({
        categoria: {
            ...request.body
        },
        errors
    }))
    async formularioCriarSalvar(@Body() dados: CreateCategoriaDto): Promise<void> {
        await this.categoriaService.create(dados);
    }

    @Get(':id/editar')
    @Render('categoria/formulario')
    async formEditar(@Param('id') id: number): Promise<object> {
        const categoria = await this.categoriaService.findOne(id);

        if (!categoria) {
            throw new Error('Categoria não encontrada!');
        }

        return {
            titulo: 'Edição de Categoria',
            subtitulo: `Atualização da categoria: ${categoria.nome}`,
            categoria
        };
    }

    @Post(':id/editar')
    @Redirect('/categorias')
    @ValidationView('categoria/formulario', ({ request, errors }) => ({
        categoria: {
            id: request.params.id,
            ...request.body
        },
        errors
    }))
    async formEditarSalvar(
        @Param('id') id: number,
        @Body() dados: UpdateCategoriaDto
    ): Promise<void> {
        await this.categoriaService.update(id, dados);
    }

    @Get(':id/excluir')
    @Render('categoria/remover')
    async formExcluir(@Param('id') id: number): Promise<object> {
        const categoria = await this.categoriaService.findOne(id);

        if (!categoria) {
            throw new Error('Categoria não encontrada!');
        }

        return {
            titulo: 'Exclusão de Categoria',
            subtitulo: `Exclusão da categoria: ${categoria.nome}`,
            categoria
        };
    }

    @Post(':id/excluir')
    @Redirect('/categorias')
    async formExcluirSalvar(@Param('id') id: number): Promise<void> {
        await this.categoriaService.remove(id);
    }

    @Post(':id/remover')
    @HttpCode(204)
    async remove(@Param('id') id: number): Promise<void> {
        await this.categoriaService.remove(id);
    }
}