import { PartialType } from '@nestjs/swagger';
import { CreateDetallesVentaDto } from './create-detalles_venta.dto';

export class UpdateDetallesVentaDto extends PartialType(CreateDetallesVentaDto) {}
