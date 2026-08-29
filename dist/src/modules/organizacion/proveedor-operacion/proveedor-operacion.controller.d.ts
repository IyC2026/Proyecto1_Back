import { ProveedorOperacionService } from './proveedor-operacion.service';
import { CreateProveedorOperacionDto } from './dto/create-proveedor-operacion.dto';
import { UpdateProveedorOperacionDto } from './dto/update-proveedor-operacion.dto';
export declare class ProveedorOperacionController {
    private readonly proveedorOperacionService;
    constructor(proveedorOperacionService: ProveedorOperacionService);
    create(createProveedorOperacionDto: CreateProveedorOperacionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProveedorOperacionDto: UpdateProveedorOperacionDto): string;
    remove(id: string): string;
}
