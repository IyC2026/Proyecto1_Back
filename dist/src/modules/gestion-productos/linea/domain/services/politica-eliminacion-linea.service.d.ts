import { IProductoRepository } from '../../../producto/domain/interfaces/producto.repository-interface';
export declare class PoliticaEliminacionLinea {
    private readonly productoRepository;
    constructor(productoRepository: IProductoRepository);
    tieneProductosActivosParaLinea(lineaId: number): Promise<boolean>;
}
