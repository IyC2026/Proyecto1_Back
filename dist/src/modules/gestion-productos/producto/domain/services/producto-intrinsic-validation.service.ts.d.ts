export declare class ProductoIntrinsicValidationService {
    validarDatosBasicos(datos: {
        denominacion: string;
        marcaId: number;
        lineaId: number;
        alicuotaIva?: number;
        precioMayorista?: number;
        precioCliente?: number;
        precioOcasional?: number;
    }): void;
    private validarDenominacion;
    private validarIds;
    private validarPrecios;
    private validarAlicuotaIva;
}
