import { Producto } from '../../../producto/domain/entities/producto.entity';
export declare class Marca {
    id: number;
    denominacion: string;
    observacion?: string;
    productos: Producto[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    usuarioCreatedId?: number;
    usuarioDeletedId?: number;
    usuarioUpdatedId?: number;
    sistema: number;
}
