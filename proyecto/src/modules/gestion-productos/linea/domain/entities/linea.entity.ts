import { SuperLinea } from '../../../super-linea/domain/entities/super-linea.entity';
import { ApiProperty } from '@nestjs/swagger';


import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Producto } from '../../../producto/domain/entities/producto.entity';
import { CantidadColumn } from 'src/modules/common/decorators/cantidad-column.decorator';

@Entity('linea')
@Index(['denominacion', 'deletedAt'], { unique: true })
export class Linea {

  //SUPER LÍNEA-------------------------------
  @ApiProperty({ description: 'SuperLínea a la que pertenece', required: false })
  @ManyToOne(() => SuperLinea, (superLinea) => superLinea.lineas)
  @JoinColumn({ name: 'super_linea_id' })
  @Index()
  superLinea: SuperLinea;

  @ApiProperty({ description: 'ID de la SuperLínea padre', required: false })
  @Column({ name: 'super_linea_id', type: 'int', nullable: true })
  superLineaId: number;
//----------------------------------------


  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  denominacion: string;

  @Column({ type: 'text', nullable: true })
  observacion?: string;

  @OneToMany(() => Producto, (producto) => producto.linea)
  productos: Producto[];
 
  @Column('boolean', { default: false })
  utilizaStockMinimo: boolean;

  @CantidadColumn()
  stockMinimo: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column({ type: 'int', nullable: true })
  usuarioCreatedId?: number;

  @Column({ type: 'int', nullable: true })
  usuarioDeletedId?: number;

  @Column({ type: 'int', nullable: true })
  usuarioUpdatedId?: number;

  @Column({ type: 'int', default: 0 })
  sistema: number;
}
