import { CreateProductoOperacionDto } from './dto/create-producto-operacion.dto';
import { UpdateProductoOperacionDto } from './dto/update-producto-operacion.dto';
export declare class ProductoOperacionService {
    create(createProductoOperacionDto: CreateProductoOperacionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProductoOperacionDto: UpdateProductoOperacionDto): string;
    remove(id: number): string;
}
