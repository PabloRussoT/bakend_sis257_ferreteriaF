import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Injectable()
export class ProductosService {
  constructor(@InjectRepository(Producto) private productosRepository: Repository<Producto>) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const existe = await this.productosRepository.findOne({
      where: {
        nombreProducto: createProductoDto.nombreProducto.trim(),
        descripcion: createProductoDto.descripcion.trim(),
        categoria: { id: createProductoDto.idCategoria },
      },
      relations: ['categoria'],
    });

    if (existe) {
      throw new ConflictException('El producto ya existe');
    }

    const productoNuevo = this.productosRepository.create({
      nombreProducto: createProductoDto.nombreProducto.trim(),
      descripcion: createProductoDto.descripcion.trim(),
      precio: createProductoDto.precio,
      stock: createProductoDto.stock,
      categoria: { id: createProductoDto.idCategoria },
    });

    return this.productosRepository.save(productoNuevo);
  }

  async findAll(): Promise<Producto[]> {
    return this.productosRepository.find({ relations: ['categoria'] });
  }

  async findAllByCliente(idCategoria: number): Promise<Producto[]> {
    return this.productosRepository
      .createQueryBuilder('producto')
      .leftJoinAndSelect('producto.categoria', 'categoria')
      .where('categoria.id_categoria = :idCategoria', { idCategoria })
      .getMany();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!producto) {
      throw new NotFoundException(`El producto ${id} no existe`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    const productoUpdate = Object.assign(producto, updateProductoDto);
    productoUpdate.categoria = { id: updateProductoDto.idCategoria } as Categoria;
    return this.productosRepository.save(productoUpdate);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.productosRepository.delete(producto.id);
  }
}
