import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Producto } from '../../../producto/domain/entities/producto.entity';

@Entity('presentacion')
@Index(['denominacion', 'deletedAt'], { unique: true })
export class Presentacion {
  @ApiProperty({ description: 'Identificador único de la Presentación' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Formato comercial de presentación (ej: 1L, 500ml, Pack x6, Lata 354ml)' })
  @Column({ type: 'varchar', length: 255 })
  denominacion: string;

  @ApiProperty({ description: 'Observaciones adicionales sobre el formato comercial', required: false })
  @Column({ type: 'text', nullable: true })
  observacion?: string;

  @OneToMany(() => Producto, (producto) => producto.presentacion)
  productos: Producto[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column({ type: 'int', nullable: true })
  usuarioCreatedId?: number;

  @Column({ type: 'int', nullable: true })
  usuarioUpdatedId?: number;

  @Column({ type: 'int', nullable: true })
  usuarioDeletedId?: number;

  @Column({ type: 'int', default: 0 })
  sistema: number;
}
