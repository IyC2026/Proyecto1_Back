// domain/services/producto-intrinsic-validation.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ProductoIntrinsicValidationService {
  /**
   * Valida todos los datos intrínsecos del producto
   */
  validarDatosBasicos(datos: {
    denominacion: string;
    marcaId: number;
    lineaId: number;
    alicuotaIva?: number;
    precio?: number;
    precioMayorista?: number;
    precioCliente?: number;
    precioOcasional?: number;
  }): void {
    this.validarDenominacion(datos.denominacion);
    this.validarIds(datos.marcaId, datos.lineaId);
    this.validarPrecios(
      datos.precio,
      datos.precioMayorista,
      datos.precioCliente,
      datos.precioOcasional,
    );
    
    if (datos.alicuotaIva !== undefined) {
      this.validarAlicuotaIva(datos.alicuotaIva);
    }
  }

  private validarDenominacion(denominacion: string): void {
    if (!denominacion || denominacion.trim().length === 0) {
      throw new BadRequestException('La denominación es obligatoria');
    }
    if (denominacion.length > 200) {
      throw new BadRequestException(
        'La denominación no puede superar 200 caracteres',
      );
    }
  }

  private validarIds(
    marcaId: number,
    lineaId: number,
  ): void {
    if (!marcaId || marcaId <= 0) {
      throw new BadRequestException('Marca ID es requerido y debe ser válido');
    }
    if (!lineaId || lineaId <= 0) {
      throw new BadRequestException('Línea ID es requerido y debe ser válido');
    }

  }

  /**
   * Valida la jerarquía de precios: Mayorista <= Cliente <= Ocasional
   */
  private validarPrecios(
    precio?: number,
    precioMayorista?: number,
    precioCliente?: number,
    precioOcasional?: number,
  ): void {
    if (precio !== undefined && (!Number.isFinite(precio) || precio <= 0)) {
      throw new BadRequestException('El precio debe ser un número mayor que cero.');
    }

    if (precioMayorista !== undefined && (!Number.isFinite(precioMayorista) || precioMayorista <= 0)) {
      throw new BadRequestException(
        'El precio mayorista debe ser mayor que cero.',
      );
    }
    if (precioCliente !== undefined && (!Number.isFinite(precioCliente) || precioCliente <= 0)) {
      throw new BadRequestException('El precio cliente debe ser mayor que cero.');
    }
    if (precioOcasional !== undefined && (!Number.isFinite(precioOcasional) || precioOcasional <= 0)) {
      throw new BadRequestException(
        'El precio ocasional debe ser mayor que cero.',
      );
    }

    // Validar jerarquía: Mayorista <= Cliente <= Ocasional
    if (precioMayorista !== undefined && precioCliente !== undefined) {
      if (precioMayorista > precioCliente) {
        throw new BadRequestException(
          'El precio Mayorista no puede superar el precio Cliente',
        );
      }
    }

    if (precioCliente !== undefined && precioOcasional !== undefined) {
      if (precioCliente > precioOcasional) {
        throw new BadRequestException(
          'El precio Cliente no puede superar el precio Ocasional',
        );
      }
    }

    if (precioMayorista !== undefined && precioOcasional !== undefined) {
      if (precioMayorista > precioOcasional) {
        throw new BadRequestException(
          'El precio Mayorista no puede superar el precio Ocasional',
        );
      }
    }
  }

  private validarAlicuotaIva(alicuotaIva: number): void {
    if (alicuotaIva < 0 || alicuotaIva > 100) {
      throw new BadRequestException(
        'La alícuota IVA debe estar entre 0 y 100',
      );
    }
  }
}