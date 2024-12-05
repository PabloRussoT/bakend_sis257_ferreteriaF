import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventasRepository: Repository<Venta>,
  ) {}

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const existe = await this.ventasRepository.findOne({
      where: {
        total: createVentaDto.total,
        cliente: { id: createVentaDto.idCliente },
      },
      relations: ['cliente'],
    });

    if (existe) {
      throw new ConflictException('La venta ya existe');
    }

    const ventaNueva = this.ventasRepository.create({
      total: createVentaDto.total,
      cliente: { id: createVentaDto.idCliente },
    });

    return this.ventasRepository.save(ventaNueva);
  }

  findAll(): Promise<Venta[]> {
    return this.ventasRepository.find({ relations: ['cliente'] });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },

      relations: ['cliente'],
    });
    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }
    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.findOne(id);
    const ventaUpdate = Object.assign(venta, updateVentaDto);
    ventaUpdate.cliente = { id: updateVentaDto.idCliente } as Cliente;
    return this.ventasRepository.save(ventaUpdate);
  }

  async remove(id: string): Promise<void> {
    const resultado = await this.ventasRepository.delete(id);
    if (!resultado.affected) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }
  }
}
