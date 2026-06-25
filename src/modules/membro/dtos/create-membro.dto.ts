import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class CreateMembroDto {
  @IsNotEmpty({ message: 'Nome obrigatório' })
  @MinLength(3, { message: 'Nome deve possuir no mínimo 3 caracteres' })
  nome!: string;

  @IsNotEmpty({ message: 'E-mail obrigatório' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email!: string;

  @IsNotEmpty({ message: 'Telefone obrigatório' })
  telefone!: string;

  @IsNotEmpty({ message: 'CPF obrigatório' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, {
    message: 'CPF inválido (use o formato 000.000.000-00 ou 11 dígitos)',
  })
  cpf!: string;
}