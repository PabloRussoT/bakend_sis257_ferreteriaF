import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Decimal128 } from 'typeorm';

export class CreateProductoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo nombre no debe ser mayor a 100 caracteres' })
  @MinLength(2, { message: 'El campo nombre no debe ser menor a 2 caracteres' })
  readonly nombreProducto: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion no debe ser vacío' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo descripcion no debe ser mayor a 100 caracteres' })
  @MinLength(1, { message: 'El campo descripcion  no debe ser menor a 5 caracteres' })
  readonly descripcion: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo precio debe estar definido' })
  @IsNumber({}, { message: 'El campo precio debe ser de tipo numérico' })
  @Min(0)
  @Max(999999.99)
  readonly precio: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo stock debe estar definido' })
  @IsInt()
  @Min(0)
  readonly stock: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idCategoria debe estar definido' })
  @IsNumber({}, { message: 'El campo idCategoria debe ser de tipo numérico' })
  readonly idCategoria: number;
}
