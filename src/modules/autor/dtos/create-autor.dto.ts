import {
  IsNotEmpty,
  MinLength
} from 'class-validator';

export class CreateAutorDto {

  @IsNotEmpty({
    message: 'Nome obrigatório'
  })
  @MinLength(3, {
    message: 'Nome deve possuir no mínimo 3 caracteres'
  })
  nome!: string;

  @IsNotEmpty({
    message: 'Biografia obrigatória'
  })
  biografia!: string;

}