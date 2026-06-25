import { Body, Controller, Get, Post, Redirect, Render, Param, Query, ParseIntPipe, UseInterceptors, Req, Res, BadRequestException } from "@nestjs/common";
import { ValidationView } from "nest-validation-view";
import { LivroService } from "./livro.service";
import { CreateLivroDto } from "./dtos/create-livro.dto";
import { UpdateLivroDto } from "./dtos/update-livro.dto";
import { LivroCombosInterceptor } from "./livro-combos.interceptor";

@UseInterceptors(LivroCombosInterceptor) // Alimenta os comboboxes de forma transparente via request.combos
@Controller('livros')
export class LivroController {
    constructor(private readonly livroService: LivroService) {}

    @Get()
    @Render('livro/inicial')
    async inicial(@Query('search') search?: string): Promise<object> {
        const listaLivros = await this.livroService.findAll(search);
        return {
            titulo: 'Consulta de Livros',
            livros: listaLivros,
            termoPesquisado: search || ''
        };
    }

    @Get('criar')
    @Render('livro/formulario')
    async formularioCriar(@Req() req: any): Promise<object> {
        return {
            titulo: 'Novo Livro',
            autores: req.combos.autores,
            categorias: req.combos.categorias
        };
    }

    @Post('criar')
    @Redirect('/livros')
    @ValidationView('livro/formulario', ({ request, errors }) => ({
        titulo: 'Novo Livro',
        autores: (request as any).combos?.autores || [],
        categorias: (request as any).combos?.categorias || [],
        livro: { ...request.body },
        errors
    }))
    async formularioCriarSalvar(
        @Body() dados: CreateLivroDto, 
        @Res({ passthrough: true }) res: any
    ): Promise<void> {
        try {
            await this.livroService.create(dados);
        } catch (erro: any) {
            // Captura o erro de duplicidade do MySQL (Código 1062 / ER_DUP_ENTRY)
            if (erro.code === 'ER_DUP_ENTRY' || erro.errno === 1062) {
                res.status(400); // Define o status HTTP de erro que o ValidationView monitoriza
                throw new BadRequestException(['O ISBN informado já está cadastrado em outro livro.']);
            }
            throw erro;
        }
    }

    @Get(':id/editar')
    @Render('livro/formulario')
    async formEditar(@Param('id', ParseIntPipe) id: number, @Req() req: any): Promise<object> {
        const livro = await this.livroService.findOne(id);
        if (!livro) throw new Error('Livro não encontrado!');

        // Mapeia os relacionamentos ManyToMany para IDs simples para o <select> do HTML
        const livroFormatado = {
            ...livro,
            autorId: livro.autores && livro.autores.length > 0 ? livro.autores[0].id : '',
            categoriaId: livro.categorias && livro.categorias.length > 0 ? livro.categorias[0].id : ''
        };

        return {
            titulo: 'Edição de Livro',
            livro: livroFormatado,
            autores: req.combos.autores,
            categorias: req.combos.categorias
        };
    }

    @Post(':id/editar')
    @Redirect('/livros')
    @ValidationView('livro/formulario', ({ request, errors }) => ({
        titulo: 'Edição de Livro',
        autores: (request as any).combos?.autores || [],
        categorias: (request as any).combos?.categorias || [],
        livro: { id: request.params.id, ...request.body },
        errors
    }))
    async formEditarSalvar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dados: UpdateLivroDto,
        @Res({ passthrough: true }) res: any
    ): Promise<void> {
        try {
            await this.livroService.update(id, dados);
        } catch (erro: any) {
            // Captura o erro de duplicidade do MySQL (Código 1062 / ER_DUP_ENTRY)
            if (erro.code === 'ER_DUP_ENTRY' || erro.errno === 1062) {
                res.status(400); // Define o status HTTP de erro que o ValidationView monitoriza
                throw new BadRequestException(['O ISBN informado já está cadastrado em outro livro.']);
            }
            throw erro;
        }
    }

    @Get(':id/excluir')
    @Render('livro/remover')
    async formExcluir(@Param('id', ParseIntPipe) id: number): Promise<object> {
        const livro = await this.livroService.findOne(id);
        if (!livro) throw new Error('Livro não encontrado!');
        return {
            titulo: 'Exclusão de Livro',
            subtitulo: `Exclusão do livro: ${livro.titulo}`,
            livro
        };
    }

    @Post(':id/excluir')
    @Redirect('/livros')
    async formExcluirSalvar(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.livroService.remove(id);
    }
}