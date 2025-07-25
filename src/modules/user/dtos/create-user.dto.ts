import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

const MIN_PASSWORD_LENGTH = 8;

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string;

  @IsString()
  cpf: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsInt()
  cityId: number;

  @IsString()
  @IsOptional()
  cnpj?: string;

  @IsInt()
  @IsOptional()
  typeId?: number;
}
