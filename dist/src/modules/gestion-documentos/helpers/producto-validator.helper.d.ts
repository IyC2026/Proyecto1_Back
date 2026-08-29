import { Producto } from 'src/modules/gestion-productos/producto/domain/entities/producto.entity';
import { ProductoService } from 'src/modules/gestion-productos/producto/application/services/producto.service';
export declare class ProductoValidator {
    private readonly productoService;
    constructor(productoService: ProductoService);
    validarProductosExisten(productosIds: number[]): Promise<Map<number, Producto>>;
}
