import { ProductoOperacionService } from './producto-operacion.service';
import { CreateProductoOperacionDto } from './dto/create-producto-operacion.dto';
import { UpdateProductoOperacionDto } from './dto/update-producto-operacion.dto';
export declare class ProductoOperacionController {
    private readonly productoOperacionService;
    constructor(productoOperacionService: ProductoOperacionService);
    create(createProductoOperacionDto: CreateProductoOperacionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProductoOperacionDto: UpdateProductoOperacionDto): string;
    remove(id: string): string;
}
