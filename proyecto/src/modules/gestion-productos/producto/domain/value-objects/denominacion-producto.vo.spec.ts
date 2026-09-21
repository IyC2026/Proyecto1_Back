import { BadRequestException } from '@nestjs/common';
import { DenominacionProducto } from './denominacion-producto.vo';

describe('DenominacionProducto (Value Object - CR-005)', () => {
  it('debe generar automáticamente la denominación concatenando Marca + Línea + Presentación', () => {
    const vo = DenominacionProducto.generarAutomatica('Coca-Cola', 'Gaseosas', '2L');
    expect(vo.getValor()).toBe('Coca-Cola Gaseosas 2L');
    expect(vo.esManual()).toBe(false);
  });

  it('debe normalizar espacios en blanco al generar automáticamente', () => {
    const vo = DenominacionProducto.generarAutomatica('  Pepsi  ', '  Bebidas  ', '  1.5L  ');
    expect(vo.getValor()).toBe('Pepsi Bebidas 1.5L');
  });

  it('debe permitir crear una denominación manual (override personalizado)', () => {
    const vo = DenominacionProducto.crearManual('Coca-Cola Edición Limitada 2.25L');
    expect(vo.getValor()).toBe('Coca-Cola Edición Limitada 2.25L');
    expect(vo.esManual()).toBe(true);
  });

  it('debe lanzar BadRequestException si la denominación manual está vacía', () => {
    expect(() => DenominacionProducto.crearManual('')).toThrow(BadRequestException);
    expect(() => DenominacionProducto.crearManual('   ')).toThrow(BadRequestException);
  });

  it('debe lanzar BadRequestException si no se proporcionan partes para la generación automática', () => {
    expect(() => DenominacionProducto.generarAutomatica('', '', '')).toThrow(BadRequestException);
  });

  it('debe reconstituir correctamente desde la persistencia', () => {
    const vo = DenominacionProducto.desdePersistencia('Fanta Naranja 500ml', false);
    expect(vo.getValor()).toBe('Fanta Naranja 500ml');
    expect(vo.esManual()).toBe(false);
  });
});
