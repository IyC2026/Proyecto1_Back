import { BadRequestException } from '@nestjs/common';

/**
 * Value Object para la Denominación del Producto (CR-005)
 * Encapsula la lógica de composición: Marca + Línea + Presentación
 * Garantiza inmutabilidad y validación de reglas de negocio.
 */
export class DenominacionProducto {
  private readonly valor: string;
  private readonly esPersonalizada: boolean;

  private constructor(valor: string, esPersonalizada = false) {
    const normalizado = valor?.trim().replace(/\s+/g, ' ');
    if (!normalizado || normalizado.length === 0) {
      throw new BadRequestException('La denominación del producto no puede estar vacía.');
    }
    if (normalizado.length > 255) {
      throw new BadRequestException('La denominación del producto no puede superar 255 caracteres.');
    }
    this.valor = normalizado;
    this.esPersonalizada = esPersonalizada;
  }

  /**
   * Genera automáticamente la denominación a partir de los datos del catálogo.
   * Formato: "Marca Línea Presentación"
   */
  public static generarAutomatica(
    marca: string,
    linea: string,
    presentacion: string,
  ): DenominacionProducto {
    const partes = [marca, linea, presentacion].map((parte) => parte?.trim());
    if (partes.some((parte) => !parte)) {
      throw new BadRequestException(
        'No se puede generar la denominación: Marca, Línea y Presentación deben tener denominación.',
      );
    }

    const denominacionGenerada = partes.join(' ');
    return new DenominacionProducto(denominacionGenerada, false);
  }

  /**
   * Crea una denominación personalizada a partir de edición manual.
   */
  public static crearManual(valorManual: string): DenominacionProducto {
    return new DenominacionProducto(valorManual, true);
  }

  /**
   * Reconstituye el Value Object a partir del estado persistido en base de datos.
   */
  public static desdePersistencia(
    valor: string,
    esPersonalizada = false,
  ): DenominacionProducto {
    return new DenominacionProducto(valor, esPersonalizada);
  }

  public getValor(): string {
    return this.valor;
  }

  public esManual(): boolean {
    return this.esPersonalizada;
  }

  public toString(): string {
    return this.valor;
  }
}
