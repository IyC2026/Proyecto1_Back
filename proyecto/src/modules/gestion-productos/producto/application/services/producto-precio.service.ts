import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Producto } from '../../domain/entities/producto.entity';
import { HistorialPrecio } from '../../domain/entities/historial-precio.entity';

@Injectable()
export class ProductoPrecioService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(HistorialPrecio)
    private readonly historialRepository: Repository<HistorialPrecio>,
  ) {}

  async registerPriceChange(
    params: {
      productoId: number;
      precioAnterior: number;
      precioNuevo: number;
      motivo: string;
      usuarioId: number;
    },
    manager?: EntityManager,
  ): Promise<HistorialPrecio> {
    const { productoId, precioAnterior, precioNuevo, motivo, usuarioId } = params;

    if (precioNuevo <= 0) {
      throw new BadRequestException('El precio debe ser mayor a cero.');
    }

    if (!motivo || motivo.trim() === '') {
      throw new BadRequestException('El motivo del cambio no puede quedar vacío.');
    }

    const producto = manager
      ? await manager.findOne(Producto, {
          where: { id: productoId },
        })
      : await this.productoRepository.findOne({
          where: { id: productoId },
        });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${productoId} no encontrado.`);
    }

    let historialGuardado: HistorialPrecio;
    let queryRunner: any;

    if (!manager) {
      queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
    }

    try {
      producto.precio = precioNuevo;
      producto.usuarioUpdated = { id: usuarioId } as any;

      const effectiveManager = manager ?? queryRunner.manager;
      await effectiveManager.save(Producto, producto);

      const historial = new HistorialPrecio();
      historial.precioAnterior = precioAnterior;
      historial.precioNuevo = precioNuevo;
      historial.motivo = motivo.trim();
      historial.productoId = productoId;
      historial.usuarioId = usuarioId;

      historialGuardado = await effectiveManager.save(HistorialPrecio, historial);

      if (queryRunner) {
        await queryRunner.commitTransaction();
      }
    } catch (error) {
      if (queryRunner) {
        await queryRunner.rollbackTransaction();
      }
      throw error;
    } finally {
      if (queryRunner) {
        await queryRunner.release();
      }
    }

    return historialGuardado;
  }

  async getHistorial(productoId: number): Promise<HistorialPrecio[]> {
    return this.historialRepository.find({
      where: { productoId },
      order: { fecha: 'DESC' },
      relations: ['usuario'],
    });
  }
}
