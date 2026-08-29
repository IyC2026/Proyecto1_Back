import { Producto } from '../../../producto/domain/entities/producto.entity';
export declare class Linea {
    id: number;
    denominacion: string;
    observacion?: string;
    productos: Producto[];
    utilizaStockMinimo: boolean;
    stockMinimo: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    usuarioCreatedId?: number;
    usuarioDeletedId?: number;
    usuarioUpdatedId?: number;
    sistema: number;
}
