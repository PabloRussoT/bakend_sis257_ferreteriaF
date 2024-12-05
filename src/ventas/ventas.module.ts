import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Venta])],
  providers: [VentasService],
  controllers: [VentasController],
  exports: [TypeOrmModule],
})
export class VentasModule {}
