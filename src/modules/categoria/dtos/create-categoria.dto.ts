import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoriaDto {
  
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório.' })
  @IsString({ message: 'O nome deve ser um texto.' })
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres.' })
  nome!: string;

  @IsNotEmpty({ message: 'A descrição da categoria é obrigatória.' })
  @IsString({ message: 'A descrição deve ser um texto.' })
  descricao!: string;
}