import { BadRequestException } from '@nestjs/common';
import { redondear } from '../../../../common/utils/number/redondeo';
import { Producto } from '../../../producto/domain/entities/producto.entity';

type CambioPrecioMasivoParametros = {
  tipoAjuste?: 'porcentaje' | 'montoFijo';
  porcentaje?: number;
  valor?: number;
  alcance?: 'global' | 'linea';
  lineaId?: number;
};

export type CambioPrecioPreparado = {
  producto: Producto;
  precioAnterior: number;
  precioNuevo: number;
};

export class CambioPrecioMasivoHelper {
  static obtenerAlcance(dto: CambioPrecioMasivoParametros): { alcance: 'global' | 'linea'; lineaId?: number } {
    const alcance = dto.alcance ?? 'global';
    if (alcance !== 'linea') return { alcance: 'global' };
    if (!Number.isInteger(dto.lineaId)) {
      throw new BadRequestException(
        'Debe indicarse una línea válida cuando el alcance es linea.',
      );
    }
    return { alcance, lineaId: dto.lineaId };
  }

  static prepararCambios(
    productos: Producto[],
    dto: CambioPrecioMasivoParametros,
  ): CambioPrecioPreparado[] {
    if (productos.length === 0) {
      throw new BadRequestException('No hay productos activos dentro del alcance seleccionado.');
    }

    const ajuste = this.resolverAjuste(dto);
    return productos.map((producto) => {
      const precioAnterior = Number(producto.precio ?? 0);
      const precioNuevo = this.calcularPrecioFinal(producto, ajuste);
      this.validarPrecio(precioNuevo, producto.denominacion);

      return { producto, precioAnterior, precioNuevo };
    });
  }

  static calcularPrecioFinal(
    producto: { precio?: number },
    ajuste: { tipoAjuste: 'porcentaje' | 'montoFijo'; valor: number },
  ): number {
    const precioBase = Number(producto.precio ?? 0);

    if (ajuste.tipoAjuste === 'porcentaje') {
      return redondear(precioBase * (1 + ajuste.valor / 100));
    }

    return redondear(precioBase + ajuste.valor);
  }

  static validarPrecio(precio: number, denominacion: string): void {
    if (!Number.isFinite(precio) || precio <= 0) {
      throw new BadRequestException(
        `El producto ${denominacion} quedaría con un precio inválido: ${precio}.`,
      );
    }
  }

  static crearMotivo(dto: CambioPrecioMasivoParametros): string {
    const ajuste = this.resolverAjuste(dto);
    return ajuste.tipoAjuste === 'porcentaje'
      ? `Cambio masivo por porcentaje: ${ajuste.valor}%`
      : `Cambio masivo por monto fijo: ${ajuste.valor}`;
  }

  private static resolverAjuste(dto: CambioPrecioMasivoParametros) {
    const tienePorcentaje = dto.porcentaje !== undefined;
    const tieneMonto = dto.valor !== undefined;
    const tipoAjuste = dto.tipoAjuste
      ?? (tienePorcentaje !== tieneMonto
        ? (tienePorcentaje ? 'porcentaje' : 'montoFijo')
        : undefined);

    if (!tipoAjuste || (tipoAjuste === 'porcentaje' && (!tienePorcentaje || tieneMonto))
      || (tipoAjuste === 'montoFijo' && (!tieneMonto || tienePorcentaje))) {
      throw new BadRequestException('Debe indicar un único tipo de ajuste y su valor numérico.');
    }

    const valor = Number(tipoAjuste === 'porcentaje' ? dto.porcentaje : dto.valor);
    if (!Number.isFinite(valor)) {
      throw new BadRequestException('El valor del ajuste debe ser un número válido.');
    }

    return { tipoAjuste, valor };
  }
}
