import { ForbiddenException } from '@nestjs/common';
import { MessageFrontUtils } from 'src/modules/common/utils/message/message-front.util';
import { PaginacionUtils } from 'src/modules/common/utils/pagination/paginacion-utils';
import { ensureNotSistemaEntity } from 'src/modules/common/utils/atrituto-sistema';

// ─── MessageFrontUtils ───────────────────────────────────────────────────────

describe('MessageFrontUtils', () => {
  describe('create', () => {
    it('retorna un objeto MensajeDto con el mensaje dado', () => {
      const result = MessageFrontUtils.create('Hola');
      expect(result).toEqual({ mensaje: 'Hola' });
    });
  });

  describe('createSimple', () => {
    it('genera mensaje para acción creada', () => {
      const result = MessageFrontUtils.createSimple('Producto', 'Laptop', 'creada');
      expect(result.mensaje).toContain('Producto');
      expect(result.mensaje).toContain('Laptop');
      expect(result.mensaje).toContain('creada');
    });

    it('genera mensaje para acción editada', () => {
      const result = MessageFrontUtils.createSimple('Marca', 'Nike', 'editada');
      expect(result.mensaje).toContain('editada');
    });

    it('genera mensaje para acción eliminada', () => {
      const result = MessageFrontUtils.createSimple('Cliente', 'Juan', 'eliminada');
      expect(result.mensaje).toContain('eliminada');
    });
  });

  describe('eliminarItem', () => {
    it('retorna mensaje y total', () => {
      const result = MessageFrontUtils.eliminarItem('Eliminado', 5);
      expect(result).toEqual({ mensaje: 'Eliminado', total: 5 });
    });
  });

  describe('createdItem', () => {
    it('retorna mensaje y total', () => {
      const result = MessageFrontUtils.createdItem('Creado', 10);
      expect(result).toEqual({ mensaje: 'Creado', total: 10 });
    });
  });

  describe('createActualizacionPrecioMasiva', () => {
    it('genera mensaje de actualización masiva', () => {
      const result = MessageFrontUtils.createActualizacionPrecioMasiva('con éxito');
      expect(result.mensaje).toContain('con éxito');
    });
  });

  describe('create2', () => {
    it('genera mensaje con éxito', () => {
      const result = MessageFrontUtils.create2('Operación');
      expect(result.mensaje).toContain('Operación');
      expect(result.mensaje).toContain('con éxito');
    });
  });
});

// ─── PaginacionUtils ─────────────────────────────────────────────────────────

describe('PaginacionUtils', () => {
  describe('totalPaginas', () => {
    it('calcula correctamente el total de páginas', () => {
      expect(PaginacionUtils.totalPaginas(100, 10)).toBe(10);
    });

    it('redondea hacia arriba si no es divisible exacto', () => {
      expect(PaginacionUtils.totalPaginas(101, 10)).toBe(11);
    });

    it('retorna 1 si hay menos registros que el tamaño de página', () => {
      expect(PaginacionUtils.totalPaginas(5, 10)).toBe(1);
    });

    it('retorna 0 si no hay registros', () => {
      expect(PaginacionUtils.totalPaginas(0, 10)).toBe(0);
    });
  });

  describe('totalItems', () => {
    it('retorna el mismo número de registros', () => {
      expect(PaginacionUtils.totalItems(42)).toBe(42);
    });

    it('retorna 0 si no hay registros', () => {
      expect(PaginacionUtils.totalItems(0)).toBe(0);
    });
  });
});

// ─── ensureNotSistemaEntity ──────────────────────────────────────────────────

describe('ensureNotSistemaEntity', () => {
  it('lanza ForbiddenException si sistema === 1', () => {
    expect(() => ensureNotSistemaEntity({ sistema: 1 }, 'Marca')).toThrow(ForbiddenException);
  });

  it('el mensaje incluye el nombre de la entidad', () => {
    expect(() => ensureNotSistemaEntity({ sistema: 1 }, 'Producto')).toThrow(/Producto/);
  });

  it('no lanza si sistema === 0', () => {
    expect(() => ensureNotSistemaEntity({ sistema: 0 }, 'Marca')).not.toThrow();
  });

  it('no lanza si sistema es undefined', () => {
    expect(() => ensureNotSistemaEntity({}, 'Marca')).not.toThrow();
  });
});
