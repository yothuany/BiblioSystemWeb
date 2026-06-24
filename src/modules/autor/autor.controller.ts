import {Body, Controller, Get, Post, Redirect, Render, Param, HttpCode, Query} from "@nestjs/common";
import {ValidationView} from "nest-validation-view";
import {AutorService} from "./autor.service";
import {CreateAutorDto} from "./dtos/create-autor.dto";
import {UpdateAutorDto} from "./dtos/update-autor.dto";

@Controller('autores')
export class AutorController {

    constructor(
        private autorService: AutorService
    ) {}

    @Get()
    @Render('autor/inicial')
    async inicial(@Query('search') search?: string): Promise<object> {
        const listaAutores = await this.autorService.findAll(search);

        return {
            titulo: 'Consulta de Autores',
            autores: listaAutores,
            termoPesquisado: search || '' 
        };
    }

    @Get('criar')
    @Render('autor/formulario')
    async formularioCriar(): Promise<object> {
        return {
            titulo: 'Novo Autor'
        };
    }

    @Post('criar')
    @Redirect('/autores')
    @ValidationView('autor/formulario', ({ request, errors }) => ({
        autor: {
            ...request.body
        },
        errors
    }))
    async formularioCriarSalvar(@Body() dados: CreateAutorDto): Promise<void> {
        await this.autorService.create(dados);
    }

    @Get(':id/editar')
    @Render('autor/formulario')
    async formEditar(@Param('id') id: number): Promise<object> {
        const autor = await this.autorService.findOne(id);

        if (!autor) {
            throw new Error('Autor não encontrado!');
        }

        return {
            titulo: 'Edição de Autor',
            subtitulo: `Atualização do autor: ${autor.nome}`,
            autor
        };
    }

    @Post(':id/editar')
    @Redirect('/autores')
    @ValidationView('autor/formulario', ({ request, errors }) => ({
        autor: {
            id: request.params.id,
            ...request.body
        },
        errors
    }))
    async formEditarSalvar(
        @Param('id') id: number,
        @Body() dados: UpdateAutorDto
    ): Promise<void> {
        await this.autorService.update(id, dados);
    }

    @Get(':id/excluir')
    @Render('autor/remover')
    async formExcluir(@Param('id') id: number): Promise<object> {
        const autor = await this.autorService.findOne(id);

        if (!autor) {
            throw new Error('Autor não encontrado!');
        }

        return {
            titulo: 'Exclusão de Autor',
            subtitulo: `Exclusão do autor: ${autor.nome}`,
            autor
        };
    }

    @Post(':id/excluir')
    @Redirect('/autores')
    async formExcluirSalvar(@Param('id') id: number): Promise<void> {
        await this.autorService.remove(id);
    }

    @Post(':id/remover')
    @HttpCode(204)
    async remove(@Param('id') id: number): Promise<void> {
        await this.autorService.remove(id);
    }
}