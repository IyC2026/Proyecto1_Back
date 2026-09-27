import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Producto } from '../../../producto/domain/entities/producto.entity';
import { ICambioPrecioMasivoRepository } from '../../domain/interfaces/cambio-precio-masivo.repository.interface';
import { CambioPrecioMasivoPersistenceAdapter } from './cambio-precio-masivo.persistence-adapter';

@Injectable()
export class CambioPrecioMasivoRepository implements ICambioPrecioMasivoRepository {
  private readonly logger = new Logger(CambioPrecioMasivoRepository.name);

  constructor(private readonly persistenceAdapter: CambioPrecioMasivoPersistenceAdapter) {}

  findByAlcance(alcance: 'global' | 'linea', lineaId?: number, manager?: EntityManager): Promise<Producto[]> {
    return this.persistenceAdapter.findByAlcance(alcance, lineaId, manager);
  }

  actualizarPrecio(
    producto: Producto,
    precioNuevo: number,
    usuarioId: number,
    manager: EntityManager,
  ): Promise<Producto> {
    return this.persistenceAdapter.actualizarPrecio(
      producto,
      precioNuevo,
      usuarioId,
      manager,
    );
  }
}
