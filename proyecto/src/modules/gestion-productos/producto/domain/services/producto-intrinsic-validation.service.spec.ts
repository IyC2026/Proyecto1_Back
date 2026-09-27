import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from '@jest/globals';
import { ProductoIntrinsicValidationService } from './producto-intrinsic-validation.service.ts';

describe('ProductoIntrinsicValidationService', () => {
  const service = new ProductoIntrinsicValidationService();
  const validData = {
    denominacion: 'Producto de prueba',
    marcaId: 1,
    lineaId: 1,
  };

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects invalid product price %s',
    (precio) => {
      expect(() => service.validarDatosBasicos({ ...validData, precio })).toThrow(
        BadRequestException,
      );
    },
  );

  it('rejects an alternate price equal to zero', () => {
    expect(() =>
      service.validarDatosBasicos({
        ...validData,
        precioMayorista: 10,
        precioCliente: 0,
      }),
    ).toThrow('El precio cliente debe ser mayor que cero.');
  });

  it('validates price hierarchy when all values are positive', () => {
    expect(() =>
      service.validarDatosBasicos({
        ...validData,
        precioMayorista: 10,
        precioCliente: 5,
      }),
    ).toThrow('El precio Mayorista no puede superar el precio Cliente');
  });
});