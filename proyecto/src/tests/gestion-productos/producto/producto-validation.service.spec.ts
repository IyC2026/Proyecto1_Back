import { BadRequestException } from '@nestjs/common';
import { ProductoValidationService } from 'src/modules/gestion-productos/producto/domain/services/producto-validation.service.ts';

describe('ProductoValidationService', () => {
  let service: ProductoValidationService;

  beforeEach(() => {
    service = new ProductoValidationService();
  });

  const marcaOk = { id: 1, sistema: 0 } as any;
  const lineaOk = { id: 1, sistema: 0 } as any;

  describe('validarEntidadesRelacionadas', () => {
    it('no lanza si marca y línea son válidas', () => {
      expect(() => service.validarEntidadesRelacionadas(marcaOk, lineaOk)).not.toThrow();
    });

    it('lanza BadRequestException si la marca es del sistema', () => {
      const marcaSistema = { id: 1, sistema: 1 } as any;
      expect(() => service.validarEntidadesRelacionadas(marcaSistema, lineaOk)).toThrow(BadRequestException);
    });

    it('lanza BadRequestException si la línea es del sistema', () => {
      const lineaSistema = { id: 2, sistema: 1 } as any;
      expect(() => service.validarEntidadesRelacionadas(marcaOk, lineaSistema)).toThrow(BadRequestException);
    });

    it('el mensaje de error incluye el tipo de entidad (Marca)', () => {
      const marcaSistema = { id: 5, sistema: 1 } as any;
      expect(() => service.validarEntidadesRelacionadas(marcaSistema, lineaOk)).toThrow(
        /Marca/,
      );
    });

    it('el mensaje de error incluye el tipo de entidad (Línea)', () => {
      const lineaSistema = { id: 3, sistema: 1 } as any;
      expect(() => service.validarEntidadesRelacionadas(marcaOk, lineaSistema)).toThrow(
        /Línea/,
      );
    });
  });
});
