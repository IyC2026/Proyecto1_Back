import { BadRequestException } from '@nestjs/common';
import { redondear } from '../../../../common/utils/number/redondeo';
import { Producto } from '../../../producto/domain/entities/producto.entity';

type CambioPrecioMasivoParametros = {
  tipoAjuste?: 'porcentaje' | 'montoFijo';
  porcentaje?: number;
  valor?: number;
};

export type CambioPrecioPreparado = {
  producto: Producto;
  precioAnterior: number;
  precioNuevo: number;
};

export class CambioPrecioMasivoHelper {
  static normalizarItems(items: any[] = []) {
    return items.filter((item) => item && item.id !== undefined && item.id !== null);
  }

  static obtenerIds(items: any[] = []): number[] {
    return this.normalizarItems(items).map((item) => item.id);
  }

  static obtenerLineaId(dto: CambioPrecioMasivoParametros & { alcance?: 'global' | 'linea'; lineaId?: number }): number | undefined {
    if (dto.alcance !== 'linea') return undefined;
    if (!Number.isInteger(dto.lineaId)) {
      throw new BadRequestException(
        'Debe indicarse una línea válida cuando el alcance es linea.',
      );
    }
    return dto.lineaId;
  }

  static prepararCambios(
    productos: Producto[],
    items: any[] = [],
    dto: CambioPrecioMasivoParametros,
  ): CambioPrecioPreparado[] {
    const itemsNormalizados = this.normalizarItems(items);

    if (itemsNormalizados.length === 0) {
      throw new BadRequestException('Debe enviarse al menos un producto para actualizar.');
    }

    if (productos.length !== itemsNormalizados.length) {
      throw new BadRequestException(
        'Hay productos que no existen o no están disponibles para actualizar.',
      );
    }

    const productosPorId = new Map(productos.map((producto) => [producto.id, producto]));

    return itemsNormalizados.map((item) => {
      const producto = productosPorId.get(item.id);
      if (!producto) {
        throw new BadRequestException(`Producto con ID ${item.id} no encontrado.`);
      }

      const precioAnterior = Number(producto.precio ?? 0);
      const precioNuevo = this.calcularPrecioFinal(producto, item, dto);
      this.validarPrecio(precioNuevo, producto.denominacion);

      return { producto, precioAnterior, precioNuevo };
    });
  }

  static calcularPrecioFinal(
    producto: { precio?: number },
    item: any,
    dto: CambioPrecioMasivoParametros,
  ): number {
    const precioBase = Number(producto.precio ?? 0);

    if (dto.tipoAjuste === 'porcentaje' || dto.porcentaje !== undefined) {
      const porcentaje = Number(dto.porcentaje ?? 0);
      return redondear(precioBase * (1 + porcentaje / 100));
    }

    if (dto.tipoAjuste === 'montoFijo' || dto.valor !== undefined) {
      const valor = Number(dto.valor ?? 0);
      return redondear(precioBase + valor);
    }

    return this.obtenerPrecioDesdeItem(producto, item, dto);
  }

  static obtenerPrecioDesdeItem(
    producto: { precio?: number },
    item: any,
    dto: CambioPrecioMasivoParametros,
  ): number {
    const claves = [
      'precioFinal',
      'precioNuevo',
      'precio',
      'precioOcasionalConIvaNuevo',
      'precioMayoristaConIvaNuevo',
      'precioClienteConIvaNuevo',
      'precioOfertaConIvaNuevo',
    ];

    for (const clave of claves) {
      const valor = Number(item?.[clave]);
      if (Number.isFinite(valor)) return redondear(valor);
    }

    return redondear(Number(producto.precio ?? 0));
  }

  static validarPrecio(precio: number, denominacion: string): void {
    if (!Number.isFinite(precio) || precio <= 0) {
      throw new BadRequestException(
        `El producto ${denominacion} quedaría con un precio inválido: ${precio}.`,
      );
    }
  }

  static crearMotivo(dto: CambioPrecioMasivoParametros): string {
    if (dto.tipoAjuste === 'porcentaje' || dto.porcentaje !== undefined) {
      return `Cambio masivo por porcentaje: ${dto.porcentaje ?? 0}%`;
    }

    if (dto.tipoAjuste === 'montoFijo' || dto.valor !== undefined) {
      return `Cambio masivo por monto fijo: ${dto.valor ?? 0}`;
    }

    return 'Cambio masivo de precios';
  }
}
