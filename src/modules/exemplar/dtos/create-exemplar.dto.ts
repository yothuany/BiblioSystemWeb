import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateExemplarDto {
  @IsNotEmpty({ message: 'O código do exemplar é obrigatório.' })
  @IsString()
  codigo!: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty({ message: 'O livro é obrigatório.' })
  // Se o valor for uma string vazia, undefined ou '0', transforma em undefined para o @IsNotEmpty falhar
  @Transform(({ value }) => (value === '' || value === undefined || Number(value) === 0 ? undefined : Number(value)))
  @IsInt({ message: 'O livro selecionado é inválido.' })
  livroId!: number;
}