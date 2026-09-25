import { BadRequestException } from '@nestjs/common';
import { ProductoIntrinsicValidationService } from 'src/modules/gestion-productos/producto/domain/services/producto-intrinsic-validation.service.ts';

describe('ProductoIntrinsicValidationService', () => {
  let service: ProductoIntrinsicValidationService;

  beforeEach(() => {
    service = new ProductoIntrinsicValidationService();
  });

  const datosBase = { denominacion: 'Producto Test', marcaId: 1, lineaId: 1 };

  // ─── denominación ───────────────────────────────────────────────────────────

  describe('validarDenominacion', () => {
    it('lanza BadRequestException si la denominación está vacía', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, denominacion: '' }),
      ).toThrow(BadRequestException);
    });

    it('lanza BadRequestException si la denominación es solo espacios', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, denominacion: '   ' }),
      ).toThrow(BadRequestException);
    });

    it('lanza BadRequestException si la denominación supera 200 caracteres', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, denominacion: 'A'.repeat(201) }),
      ).toThrow(BadRequestException);
    });

    it('no lanza si la denominación es válida', () => {
      expect(() =>
        service.validarDatosBasicos(datosBase),
      ).not.toThrow();
    });
  });

  // ─── IDs ────────────────────────────────────────────────────────────────────

  describe('validarIds', () => {
    it('lanza BadRequestException si marcaId es 0', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, marcaId: 0 }),
      ).toThrow(BadRequestException);
    });

    it('lanza BadRequestException si lineaId es negativo', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, lineaId: -1 }),
      ).toThrow(BadRequestException);
    });
  });

  // ─── precios ────────────────────────────────────────────────────────────────

  describe('validarPrecios - jerarquía Mayorista <= Cliente <= Ocasional', () => {
    it('lanza si precioMayorista es negativo', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, precioMayorista: -1 }),
      ).toThrow(BadRequestException);
    });

    it('lanza si precioCliente es negativo', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, precioCliente: -5 }),
      ).toThrow(BadRequestException);
    });

    it('lanza si precioOcasional es negativo', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, precioOcasional: -10 }),
      ).toThrow(BadRequestException);
    });

    it('lanza si precioMayorista > precioCliente', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, precioMayorista: 200, precioCliente: 100 }),
      ).toThrow(BadRequestException);
    });

    it('lanza si precioCliente > precioOcasional', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, precioCliente: 300, precioOcasional: 200 }),
      ).toThrow(BadRequestException);
    });

    it('lanza si precioMayorista > precioOcasional', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, precioMayorista: 500, precioOcasional: 100 }),
      ).toThrow(BadRequestException);
    });

    it('no lanza con jerarquía correcta Mayorista <= Cliente <= Ocasional', () => {
      expect(() =>
        service.validarDatosBasicos({
          ...datosBase,
          precioMayorista: 100,
          precioCliente: 150,
          precioOcasional: 200,
        }),
      ).not.toThrow();
    });

    it('no lanza si los precios son iguales', () => {
      expect(() =>
        service.validarDatosBasicos({
          ...datosBase,
          precioMayorista: 100,
          precioCliente: 100,
          precioOcasional: 100,
        }),
      ).not.toThrow();
    });
  });

  // ─── alícuota IVA ───────────────────────────────────────────────────────────

  describe('validarAlicuotaIva', () => {
    it('lanza si alicuotaIva es negativa', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, alicuotaIva: -1 }),
      ).toThrow(BadRequestException);
    });

    it('lanza si alicuotaIva supera 100', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, alicuotaIva: 101 }),
      ).toThrow(BadRequestException);
    });

    it('no lanza con alicuotaIva = 21', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, alicuotaIva: 21 }),
      ).not.toThrow();
    });

    it('no lanza con alicuotaIva = 0', () => {
      expect(() =>
        service.validarDatosBasicos({ ...datosBase, alicuotaIva: 0 }),
      ).not.toThrow();
    });
  });
});
