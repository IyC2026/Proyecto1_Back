import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, IsNull, Repository } from 'typeorm';
import { Producto } from '../../../producto/domain/entities/producto.entity';
import { ICambioPrecioMasivoRepository } from '../../domain/interfaces/cambio-precio-masivo.repository.interface';

@Injectable()
export class CambioPrecioMasivoPersistenceAdapter implements ICambioPrecioMasivoRepository {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async findByAlcance(
    alcance: 'global' | 'linea',
    lineaId?: number,
    manager?: EntityManager,
  ): Promise<Producto[]> {
    const repository = manager?.getRepository(Producto) ?? this.productoRepository;
    const where = alcance === 'linea'
      ? { lineaId, deletedAt: IsNull() }
      : { deletedAt: IsNull() };

    return repository.find({ where, order: { id: 'ASC' } });
  }

  async actualizarPrecio(
    producto: Producto,
    precioNuevo: number,
    usuarioId: number,
    manager: EntityManager,
  ): Promise<Producto> {
    producto.precio = precioNuevo;
    producto.usuarioUpdated = { id: usuarioId } as any;
    return manager.getRepository(Producto).save(producto);
  }
}
