import { Body, Controller, Get, Post, Redirect, Render, Param, ParseIntPipe, Res, BadRequestException } from "@nestjs/common";
import { ValidationView } from "nest-validation-view";
import * as EmprestimoServices from "./emprestimo.service";
import { CreateEmprestimoDto } from "./dtos/create-emprestimo.dto";
import { UpdateEmprestimoDto } from "./dtos/update-emprestimo.dto";

@Controller('emprestimos')
export class EmprestimoController {
    constructor(private readonly service: EmprestimoServices.EmprestimoService) {}

    @Get()
    @Render('emprestimo/inicial')
    async inicial() {
        const emprestimos = await this.service.findAll();
        return {
            titulo: 'Módulo de Empréstimos',
            subtitulo: 'Gerencie retiradas e devoluções de livros',
            emprestimos,
        };
    }

    @Get('criar')
    @Render('emprestimo/formulario')
    formCriar() {
        return {
            titulo: 'Novo Empréstimo',
            subtitulo: 'Registrar saída de exemplar',
            emprestimo: {},
        };
    }

    @Post('criar')
    @Redirect('/emprestimos')
    @ValidationView('emprestimo/formulario', ({ request, errors }) => ({
        titulo: 'Novo Empréstimo',
        subtitulo: 'Registrar saída de exemplar',
        emprestimo: { ...request.body },
        errors
    }))
    async criar(
        @Body() dto: CreateEmprestimoDto, 
        @Res({ passthrough: true }) res: any
    ): Promise<void> {
        try {
            await this.service.create(dto);
        } catch (erro: any) {
            res.status(400); 
            throw new BadRequestException([erro.message || 'Erro ao processar empréstimo.']);
        }
    }

    @Get(':id/editar')
    @Render('emprestimo/formulario')
    async formEditar(@Param('id', ParseIntPipe) id: number) {
        const emprestimo = await this.service.findOne(id);
        
        const emprestimoFormatado = {
            id: emprestimo.id,
            data_emprestimo: emprestimo.data_emprestimo,
            data_prevista_devolucao: emprestimo.data_prevista_devolucao,
            data_devolucao: emprestimo.data_devolucao,
            status: 'Devolvido',
            valor_multa: emprestimo.valor_multa,
            membroCpf: emprestimo.membro ? emprestimo.membro.cpf : '',
            exemplarCodigo: emprestimo.exemplar ? emprestimo.exemplar.codigo : ''
        };

        return {
            titulo: 'Registrar Devolução',
            subtitulo: `Confirmando retorno do livro para o empréstimo #${id}`,
            emprestimo: { ...emprestimoFormatado },
        };
    }

    @Post(':id/editar')
    @Redirect('/emprestimos')
    @ValidationView('emprestimo/formulario', ({ request, errors }) => {
        const { id, ...corpoSemId } = request.body; 
        return {
            titulo: 'Registrar Devolução',
            subtitulo: `Confirmando retorno do livro para o empréstimo #${request.params.id}`,
            emprestimo: { id: Number(request.params.id), ...corpoSemId },
            errors
        };
    })
    async editar(
        @Param('id', ParseIntPipe) id: number, 
        @Body() dto: UpdateEmprestimoDto, 
        @Res({ passthrough: true }) res: any
    ): Promise<void> {
        try {
            await this.service.update(id, dto);
        } catch (erro: any) {
            res.status(400);
            throw new BadRequestException([erro.message || 'Erro ao atualizar empréstimo.']);
        }
    }

    @Get(':id/excluir')
    @Render('emprestimo/remover')
    async formExcluir(@Param('id', ParseIntPipe) id: number) {
        const emprestimo = await this.service.findOne(id);
        return {
            titulo: 'Atenção: Excluir Empréstimo',
            subtitulo: 'Confirme a remoção do registro',
            emprestimo,
        };
    }

    @Post(':id/excluir')
    @Redirect('/emprestimos')
    async excluir(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.service.remove(id);
    }
}