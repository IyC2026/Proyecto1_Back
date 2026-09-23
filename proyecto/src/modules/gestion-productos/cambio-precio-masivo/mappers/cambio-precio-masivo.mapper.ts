import { Producto } from '../../producto/domain/entities/producto.entity';

export interface CambioPrecioMasivoResultado {
  id: number;
  denominacion: string;
  precioAnterior: number;
  precioNuevo: number;
}

export class CambioPrecioMasivoMapper {
  static toResultado(
    producto: Producto,
    precioNuevo: number,
  ): CambioPrecioMasivoResultado {
    return {
      id: producto.id,
      denominacion: producto.denominacion,
      precioAnterior: Number(producto.precio ?? 0),
      precioNuevo,
    };
  }
}
