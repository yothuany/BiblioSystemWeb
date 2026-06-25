import { Body, Controller, Get, Post, Redirect, Render, Param, HttpCode, Query, BadRequestException } from "@nestjs/common";
import { ValidationView } from "nest-validation-view";
import { MembroService } from "./membro.service";
import { CreateMembroDto } from "./dtos/create-membro.dto";
import { UpdateMembroDto } from "./dtos/update-membro.dto";

@Controller('membros')
export class MembroController {

    constructor(
        private membroService: MembroService
    ) {}

    @Get()
    @Render('membro/inicial')
    async inicial(@Query('search') search?: string): Promise<object> {
        const listaMembros = await this.membroService.findAll(search);

        return {
            titulo: 'Consulta de Membros',
            membros: listaMembros,
            termoPesquisado: search || '' 
        };
    }

    @Get('criar')
    @Render('membro/formulario')
    async formularioCriar(): Promise<object> {
        return {
            titulo: 'Novo Membro'
        };
    }

    @Post('criar')
    @Redirect('/membros')
    @ValidationView('membro/formulario', ({ request, errors }) => ({
        membro: {
            ...request.body
        },
        errors
    }))
    async formularioCriarSalvar(@Body() dados: CreateMembroDto): Promise<void> {
        try {
            await this.membroService.create(dados);
        } catch (error: any) {
            // Código 1062 é o ER_DUP_ENTRY do MySQL
            if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
                const campoDuplicado = error.sqlMessage.includes('membro.cpf') ? 'cpf' : 'email';
                const mensagem = campoDuplicado === 'cpf' 
                    ? 'Este CPF já está cadastrado no sistema.' 
                    : 'Este endereço de e-mail já está cadastrado no sistema.';

                // Lançamos a exceção que o ValidationView captura e envia para a View automaticamente
                throw new BadRequestException({
                    message: [mensagem],
                    error: 'Bad Request',
                    statusCode: 400
                });
            }
            throw error;
        }
    }

    @Get(':id/editar')
    @Render('membro/formulario')
    async formEditar(@Param('id') id: number): Promise<object> {
        const membro = await this.membroService.findOne(id);

        if (!membro) {
            throw new Error('Membro não encontrado!');
        }

        return {
            titulo: 'Edição de Membro',
            subtitulo: `Atualização do membro: ${membro.nome}`,
            membro
        };
    }

    @Post(':id/editar')
    @Redirect('/membros')
    @ValidationView('membro/formulario', ({ request, errors }) => ({
        membro: {
            id: request.params.id,
            ...request.body
        },
        errors
    }))
    async formEditarSalvar(
        @Param('id') id: number,
        @Body() dados: UpdateMembroDto
    ): Promise<void> {
        try {
            await this.membroService.update(id, dados);
        } catch (error: any) {
            if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
                const campoDuplicado = error.sqlMessage.includes('membro.cpf') ? 'cpf' : 'email';
                const mensagem = campoDuplicado === 'cpf' 
                    ? 'Este CPF já está sendo usado por outro membro.' 
                    : 'Este e-mail já está sendo usado por outro membro.';

                throw new BadRequestException({
                    message: [mensagem],
                    error: 'Bad Request',
                    statusCode: 400
                });
            }
            throw error;
        }
    }

    @Get(':id/excluir')
    @Render('membro/remover')
    async formExcluir(@Param('id') id: number): Promise<object> {
        const membro = await this.membroService.findOne(id);

        if (!membro) {
            throw new Error('Membro não encontrado!');
        }

        return {
            titulo: 'Exclusão de Membro',
            subtitulo: `Exclusão do membro: ${membro.nome}`,
            membro
        };
    }

    @Post(':id/excluir')
    @Redirect('/membros')
    async formExcluirSalvar(@Param('id') id: number): Promise<void> {
        await this.membroService.remove(id);
    }

    @Post(':id/remover')
    @HttpCode(204)
    async remove(@Param('id') id: number): Promise<void> {
        await this.membroService.remove(id);
    }
}