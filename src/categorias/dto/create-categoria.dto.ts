import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion no debe ser vacío' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo descripcion no debe ser mayor a 100 caracteres' })
  @MinLength(5, { message: 'El campo descripcion no debe ser menor a 5 caracteres' })
  readonly descripcion: string;
}
