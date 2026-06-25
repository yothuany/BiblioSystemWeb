import { IsNotEmpty, MinLength, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateLivroDto {
  @IsNotEmpty({ message: 'Título obrigatório' })
  @MinLength(3, { message: 'Título deve possuir no mínimo 3 caracteres' })
  titulo!: string;

  @IsNotEmpty({ message: 'ISBN obrigatório' })
  isbn!: string;

  @IsNotEmpty({ message: 'Ano de publicação obrigatório' })
  @Transform(({ value }) => (value === '' ? null : Number(value)))
  @IsInt({ message: 'Ano de publicação deve ser um número inteiro' })
  @Min(1000, { message: 'Ano de publicação inválido' })
  @Max(2026, { message: 'O ano de publicação não pode ser maior que o ano atual' })
  anoPublicacao!: number;

  @IsNotEmpty({ message: 'Editora obrigatória' })
  editora!: string;

  @IsNotEmpty({ message: 'Selecione um autor' })
  @Transform(({ value }) => (value === '' || value === undefined ? null : Number(value)))
  @IsInt({ message: 'Selecione um autor válido' })
  autorId!: number;

  @IsNotEmpty({ message: 'Selecione uma categoria' })
  @Transform(({ value }) => (value === '' || value === undefined ? null : Number(value)))
  @IsInt({ message: 'Selecione uma categoria válida' })
  categoriaId!: number;
}