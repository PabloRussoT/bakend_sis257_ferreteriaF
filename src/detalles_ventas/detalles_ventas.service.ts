import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetallesVentaDto } from './dto/create-detalles_venta.dto';
import { UpdateDetallesVentaDto } from './dto/update-detalles_venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleVenta } from './entities/detalles_venta.entity';
import { Repository } from 'typeorm';
import { Venta } from '../ventas/entities/venta.entity';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class DetallesVentasService {
  constructor(
    @InjectRepository(DetalleVenta)
    private detallesVentasRepository: Repository<DetalleVenta>,
    @InjectRepository(Venta)
    private ventasRepository: Repository<Venta>,
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  async create(createDetallesVentaDto: CreateDetallesVentaDto): Promise<DetalleVenta> {
    const producto = await this.productosRepository.findOneBy({
      id: createDetallesVentaDto.idProducto,
    });
    if (!producto) {
      throw new NotFoundException(
        `El producto con ID ${createDetallesVentaDto.idProducto} no existe`,
      );
    }

    const detalleVenta = this.detallesVentasRepository.create({
      producto,
      cantidad: createDetallesVentaDto.cantidad,
      precioUnitario: createDetallesVentaDto.precioUnitario,
      subTotal: createDetallesVentaDto.subTotal,
    });

    return this.detallesVentasRepository.save(detalleVenta);
  }

  async findAll(): Promise<DetalleVenta[]> {
    return this.detallesVentasRepository.find({ relations: ['producto'] });
  }

  async findOne(id: number): Promise<DetalleVenta> {
    const detalleVenta = await this.detallesVentasRepository.findOne({
      where: { id },
      relations: ['producto'],
    });
    if (!detalleVenta) {
      throw new NotFoundException(`El detalle de venta con ID ${id} no existe`);
    }
    return detalleVenta;
  }

  async update(id: number, updateDetallesVentaDto: UpdateDetallesVentaDto): Promise<DetalleVenta> {
    const detalleVenta = await this.findOne(id);

    Object.assign(detalleVenta, updateDetallesVentaDto);

    return this.detallesVentasRepository.save(detalleVenta);
  }

  async remove(id: number): Promise<void> {
    const detalleVenta = await this.findOne(id);
    await this.detallesVentasRepository.delete(detalleVenta.id);
  }
}
