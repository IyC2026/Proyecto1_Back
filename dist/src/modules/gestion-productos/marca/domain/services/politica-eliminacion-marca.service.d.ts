import { IProductoRepository } from '../../../producto/domain/interfaces/producto.repository-interface';
export declare class PoliticaEliminacionMarca {
    private readonly productoRepository;
    constructor(productoRepository: IProductoRepository);
    tieneProductosActivosParaMarca(marcaId: number): Promise<boolean>;
}
