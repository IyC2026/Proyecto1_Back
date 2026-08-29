import { CreateProveedorOperacionDto } from './dto/create-proveedor-operacion.dto';
import { UpdateProveedorOperacionDto } from './dto/update-proveedor-operacion.dto';
export declare class ProveedorOperacionService {
    create(createProveedorOperacionDto: CreateProveedorOperacionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProveedorOperacionDto: UpdateProveedorOperacionDto): string;
    remove(id: number): string;
}
