import { AlicuotaIva } from 'src/modules/organizacion/enums/alicuota-iva.enum';
export declare class CreateProductoDto {
    denominacion: string;
    observacion?: string;
    codigoProveedor?: string;
    codigoBarra?: string;
    codigoReferencia?: string;
    ubicacion?: string;
    utilizaStockMinimo: boolean;
    stockMinimo?: number;
    stock?: number;
    costoEnDolar?: boolean;
    destacado?: boolean;
    envioGratis?: boolean;
    costo?: number;
    utilizaPack: boolean;
    cantidadPorPack?: number;
    costoDolar?: number;
    lineaId: number;
    marcaId: number;
    porcentaje?: number;
    precio: number;
    createdAt?: Date;
    alicuotaIva: AlicuotaIva;
    usuarioCreatedId: number;
}
