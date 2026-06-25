import { IsNotEmpty, IsDateString, IsOptional, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEmprestimoDto {
  @IsNotEmpty({ message: 'A data do empréstimo é obrigatória.' })
  @IsDateString({}, { message: 'Data de empréstimo inválida.' })
  data_emprestimo!: string;

  @IsNotEmpty({ message: 'A data prevista de devolução é obrigatória.' })
  @IsDateString({}, { message: 'Data prevista de devolução inválida.' })
  data_prevista_devolucao!: string;

  @IsOptional()
  @Transform(({ value }) => value === '' ? null : value)
  data_devolucao?: string;

  @IsOptional()
  @Transform(({ value }) => value === '' ? 0.00 : Number(value))
  @IsNumber({}, { message: 'O valor da multa deve ser um número.' })
  valor_multa?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty({ message: 'O CPF do membro é obrigatório.' })
  @IsString()
  membroCpf!: string;

  @IsNotEmpty({ message: 'O código do exemplar é obrigatório.' })
  @IsString()
  exemplarCodigo!: string;
}