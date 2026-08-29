import { IProductoRepository } from '../../domain/interfaces/producto.repository-interface';
export declare class ProductoUniquenessValidator {
    private readonly repository;
    private readonly logger;
    constructor(repository: IProductoRepository);
    validarDenominacionUnica(denominacion: string, excludeId?: number): Promise<void>;
    validarCodigoProveedorUnico(codigoProveedor: string, excludeId: number): Promise<void>;
}
