import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateVentaDto {
  @ApiProperty({
    example: '2024-10-14',
  })
  @IsNotEmpty({ message: 'El campo fecha es obligatorio' })
  @IsDateString({}, { message: 'El campo fecha debe ser una cadena válida en formato de fecha' })
  readonly fecha: Date;

  @ApiProperty({
    description: 'ID del cliente que realiza la compra',
    example: 1,
  })
  @IsNotEmpty({ message: 'El campo id_cliente es obligatorio' })
  @IsNumber({}, { message: 'El campo id_cliente debe ser de tipo numérico' })
  readonly idCliente: number;
  /*
  @ApiProperty({
    description: 'ID del usuario que registra la venta',
    example: 2,
  })
  @IsNotEmpty({ message: 'El campo id_usuario es obligatorio' })
  @IsNumber({}, { message: 'El campo id_usuario debe ser de tipo numérico' })
  readonly id_usuario: number;
*/
  @ApiProperty({
    description: 'Monto total de la venta',
  })
  @IsNotEmpty({ message: 'El campo total es obligatorio' })
  @IsNumber({}, { message: 'El campo total debe ser de tipo numérico' })
  readonly total: number;
}
