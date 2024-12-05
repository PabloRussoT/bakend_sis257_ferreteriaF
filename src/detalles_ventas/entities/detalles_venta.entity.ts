import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('detalles_ventas')
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  precioUnitario: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  subTotal: number;
  /*
  @ManyToOne(() => Venta, venta => venta.detalleventas)
  @JoinColumn({ name: 'id_venta', referencedColumnName: 'id' })
  venta: Venta;
*/
  @ManyToOne(() => Producto, producto => producto.detalleventas)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;
}
