import { EntityManager } from 'typeorm';
import { Producto } from '../../../producto/domain/entities/producto.entity';

export interface ICambioPrecioMasivoRepository {
  findByAlcance(alcance: 'global' | 'linea', lineaId?: number, manager?: EntityManager): Promise<Producto[]>;
  actualizarPrecio(
    producto: Producto,
    precioNuevo: number,
    usuarioId: number,
    manager: EntityManager,
  ): Promise<Producto>;
}
