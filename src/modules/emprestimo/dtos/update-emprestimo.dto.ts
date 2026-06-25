import { IsOptional, IsString } from 'class-validator';

export class UpdateEmprestimoDto {
    @IsOptional()
    @IsString()
    membroCpf?: string;

    @IsOptional()
    @IsString()
    exemplarCodigo?: string;

    @IsOptional()
    @IsString()
    data_emprestimo?: string;

    @IsOptional()
    @IsString()
    data_prevista_devolucao?: string;

    @IsOptional()
    @IsString()
    status?: string; 
}