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
import { Linea } from '../../../linea/domain/entities/linea.entity';

@Entity('super_linea')
@Index(['denominacion', 'deletedAt'], { unique: true })
export class SuperLinea {
  @ApiProperty({ description: 'Identificador único de la SuperLínea' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre o denominación de la SuperLínea (ej: Bebidas, Almacén)' })
  @Column({ type: 'varchar', length: 255 })
  denominacion: string;

  @ApiProperty({ description: 'Observaciones adicionales', required: false })
  @Column({ type: 'text', nullable: true })
  observacion?: string;

  @OneToMany(() => Linea, (linea) => linea.superLinea)
  lineas: Linea[];

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
