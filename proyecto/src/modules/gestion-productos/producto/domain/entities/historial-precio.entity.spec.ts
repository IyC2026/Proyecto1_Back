import { BadRequestException } from '@nestjs/common';
import { describe, expect, it } from '@jest/globals';
import { HistorialPrecio } from './historial-precio.entity';

describe('HistorialPrecio immutability', () => {
  it('rejects update and deletion lifecycle operations', () => {
    const historial = new HistorialPrecio();

    expect(() => historial.impedirMutacion()).toThrow(BadRequestException);
    expect(() => historial.impedirMutacion()).toThrow(
      'Los registros del historial de precios son inmutables y no se pueden modificar ni eliminar.',
    );
  });
});
