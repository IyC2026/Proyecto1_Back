import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { HistorialPrecio } from '../../domain/entities/historial-precio.entity';

@Injectable()
export class HistorialPrecioRepository {
  constructor(
    @InjectRepository(HistorialPrecio)
    private readonly repository: Repository<HistorialPrecio>,
  ) {}

  async create(historial: Partial<HistorialPrecio>, manager?: EntityManager): Promise<HistorialPrecio> {
    const repo = manager ? manager.getRepository(HistorialPrecio) : this.repository;
    const newHistorial = repo.create(historial);
    return repo.save(newHistorial);
  }

  async findByProductoId(productoId: number): Promise<HistorialPrecio[]> {
    return this.repository.find({
      where: { productoId },
      order: { fecha: 'DESC' },
      relations: ['usuario'],
    });
  }
}
