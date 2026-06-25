import { Body, Controller, Get, Post, Redirect, Render, Param, HttpCode, Query, UseInterceptors, Req, Res, BadRequestException } from "@nestjs/common";
import { ValidationView } from "nest-validation-view";
import { ExemplarService } from "./exemplar.service";
import { CreateExemplarDto } from "./dtos/create-exemplar.dto";
import { UpdateExemplarDto } from "./dtos/update-exemplar.dto";
import { ExemplarCombosInterceptor } from "./exemplar-combos.interceptor";

@Controller('exemplares')
export class ExemplarController {

    constructor(private readonly exemplarService: ExemplarService) {}

    @Get()
    @Render('exemplar/inicial')
    async inicial(@Query('search') search?: string): Promise<object> {
        const listaExemplares = await this.exemplarService.findAll(search);
        return {
            titulo: 'Consulta de Exemplares',
            exemplares: listaExemplares,
            termoPesquisado: search || ''
        };
    }

    @Get('criar')
    @UseInterceptors(ExemplarCombosInterceptor)
    @Render('exemplar/formulario')
    async formularioCriar(@Req() req: any): Promise<object> {
        return {
            titulo: 'Novo Exemplar',
            livros: req.combos.livros
        };
    }

    @Post('criar')
    @UseInterceptors(ExemplarCombosInterceptor)
    @Redirect('/exemplares')
    @ValidationView('exemplar/formulario', ({ request, errors }) => ({
        titulo: 'Novo Exemplar',
        livros: (request as any).combos?.livros || [],
        exemplar: { ...request.body },
        errors
    }))
    async formularioCriarSalvar(
        @Body() dados: CreateExemplarDto,
        @Res({ passthrough: true }) res: any
    ): Promise<void> {
        try {
            await this.exemplarService.create(dados);
        } catch (erro: any) {
            if (erro.code === 'ER_DUP_ENTRY' || erro.errno === 1062) {
                res.status(400);
                throw new BadRequestException(['Este código de exemplar já está cadastrado.']);
            }
            throw erro;
        }
    }

    @Get(':id/editar')
    @UseInterceptors(ExemplarCombosInterceptor)
    @Render('exemplar/formulario')
    async formEditar(@Param('id') id: number, @Req() req: any): Promise<object> {
        const exemplar = await this.exemplarService.findOne(id);
        if (!exemplar) throw new Error('Exemplar não encontrado!');

        return {
            titulo: 'Edição de Exemplar',
            subtitulo: `Atualização do exemplar: ${exemplar.codigo}`,
            exemplar,
            livros: req.combos.livros
        };
    }

    @Post(':id/editar')
    @UseInterceptors(ExemplarCombosInterceptor)
    @Redirect('/exemplares')
    @ValidationView('exemplar/formulario', ({ request, errors }) => ({
        titulo: 'Edição de Exemplar',
        livros: (request as any).combos?.livros || [],
        exemplar: { id: request.params.id, ...request.body },
        errors
    }))
    async formEditarSalvar(
        @Param('id') id: number,
        @Body() dados: UpdateExemplarDto,
        @Res({ passthrough: true }) res: any
    ): Promise<void> {
        try {
            await this.exemplarService.update(id, dados);
        } catch (erro: any) {
            if (erro.code === 'ER_DUP_ENTRY' || erro.errno === 1062) {
                res.status(400);
                throw new BadRequestException(['Este código de exemplar já está cadastrado em outro registro.']);
            }
            throw erro;
        }
    }

    @Get(':id/excluir')
    @Render('exemplar/remover')
    async formExcluir(@Param('id') id: number): Promise<object> {
        const exemplar = await this.exemplarService.findOne(id);
        if (!exemplar) throw new Error('Exemplar não encontrado!');

        return {
            titulo: 'Exclusão de Exemplar',
            subtitulo: `Exclusão do exemplar: ${exemplar.codigo}`,
            exemplar
        };
    }

    @Post(':id/excluir')
    @Redirect('/exemplares')
    async formExcluirSalvar(@Param('id') id: number): Promise<void> {
        await this.exemplarService.remove(id);
    }

    @Post(':id/remover')
    @HttpCode(204)
    async remove(@Param('id') id: number): Promise<void> {
        await this.exemplarService.remove(id);
    }
}