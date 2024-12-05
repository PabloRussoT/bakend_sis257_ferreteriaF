import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo nombre no debe ser mayor a 100 caracteres' })
  @MinLength(2, { message: 'El campo nombre no debe ser menor a 2 caracteres' })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellido no debe ser vacío' })
  @IsString({ message: 'El campo apellido debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo apellido no debe ser mayor a 100 caracteres' })
  @MinLength(2, { message: 'El campo apellido no debe ser menor a 2 caracteres' })
  readonly apellido: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo telefono no debe ser vacío' })
  @IsString({ message: 'El campo telefono debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El campo telefono no debe ser mayor a 100 caracteres' })
  @Matches(/^[0-9+() -]*$/, { message: 'El número de teléfono no es válido' })
  readonly telefono: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El campo email debe tener el formato correcto' })
  @IsNotEmpty({ message: 'El campo email no debe ser vacío' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo direccion no debe ser vacío' })
  @IsString({ message: 'El campo direccion debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo direccion no debe ser mayor a 100 caracteres' })
  @MinLength(2, { message: 'El campo direccion no debe ser menor a 2 caracteres' })
  readonly direccion: string;
}
