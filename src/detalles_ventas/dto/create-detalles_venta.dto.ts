import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateDetallesVentaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo cantidad no debe ser vacío' })
  @IsNumber({}, { message: 'El campo cantidad debe ser un número' })
  readonly cantidad: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo precio_unitario no debe ser vacío' })
  @IsNumber({}, { message: 'El campo precio_unitario debe ser un número' })
  readonly precioUnitario: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo subtotal no debe ser vacío' })
  @IsNumber({}, { message: 'El campo subtotal debe ser un número' })
  readonly subTotal: number;
  /*
  @ApiProperty({
    description: 'ID de la venta que realiza la compra',
  })
  @IsNotEmpty({ message: 'El campo id_venta es obligatorio' })
  @IsNumber({}, { message: 'El campo id_venta debe ser de tipo numérico' })
  readonly idVenta: number;
*/
  @ApiProperty({
    description: 'ID del producto que realiza la compra',
  })
  @IsNotEmpty({ message: 'El campo id_producto es obligatorio' })
  @IsNumber({}, { message: 'El campo id_producto debe ser de tipo numérico' })
  readonly idProducto: number;
}
