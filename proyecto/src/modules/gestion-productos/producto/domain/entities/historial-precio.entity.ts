import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Producto } from './producto.entity';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { MonetarioColumn } from 'src/modules/common/decorators/monetario-column.decorator';

@Entity('historial_precio')
export class HistorialPrecio {
  @PrimaryGeneratedColumn()
  id: number;

  @MonetarioColumn()
  precioAnterior: number;

  @MonetarioColumn()
  precioNuevo: number;

  @Column({ type: 'text' })
  motivo: string;

  @CreateDateColumn()
  fecha: Date;

  @ManyToOne(() => Producto, (producto) => producto.historialPrecios)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'producto_id', type: 'int', nullable: false })
  productoId: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id', type: 'int', nullable: false })
  usuarioId: number;
}
