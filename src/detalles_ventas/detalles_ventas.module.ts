import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVenta } from './entities/detalles_venta.entity';
import { Producto } from '../productos/entities/producto.entity';
import { DetallesVentasService } from './detalles_ventas.service';
import { DetallesVentasController } from './detalles_ventas.controller';
import { VentasModule } from '../ventas/ventas.module';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleVenta, Producto]), VentasModule],
  controllers: [DetallesVentasController],
  providers: [DetallesVentasService],
})
export class DetallesVentasModule {}
