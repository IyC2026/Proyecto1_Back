import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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

  async registerPriceChange(params: {
    productoId: number;
    precioAnterior: number;
    precioNuevo: number;
    motivo: string;
    usuarioId: number;
  }): Promise<HistorialPrecio> {
    const { productoId, precioAnterior, precioNuevo, motivo, usuarioId } = params;

    // Validación de precio > 0
    if (precioNuevo <= 0) {
      throw new BadRequestException('El precio debe ser mayor a cero.');
    }

    // Validación de motivo no vacío
    if (!motivo || motivo.trim() === '') {
      throw new BadRequestException('El motivo del cambio no puede quedar vacío.');
    }

    const producto = await this.productoRepository.findOne({
      where: { id: productoId },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${productoId} no encontrado.`);
    }

    let historialGuardado: HistorialPrecio;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Actualizar el precio del producto
      producto.precio = precioNuevo;
      producto.usuarioUpdated = { id: usuarioId } as any;
      
      await queryRunner.manager.save(Producto, producto);

      // Crear registro histórico
      const historial = new HistorialPrecio();
      historial.precioAnterior = precioAnterior;
      historial.precioNuevo = precioNuevo;
      historial.motivo = motivo.trim();
      historial.productoId = productoId;
      historial.usuarioId = usuarioId;

      historialGuardado = await queryRunner.manager.save(HistorialPrecio, historial);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
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
