import { EmpresaOperacionService } from './empresa-operacion.service';
import { CreateEmpresaOperacionDto } from './dto/create-empresa-operacion.dto';
import { UpdateEmpresaOperacionDto } from './dto/update-empresa-operacion.dto';
export declare class EmpresaOperacionController {
    private readonly empresaOperacionService;
    constructor(empresaOperacionService: EmpresaOperacionService);
    create(createEmpresaOperacionDto: CreateEmpresaOperacionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEmpresaOperacionDto: UpdateEmpresaOperacionDto): string;
    remove(id: string): string;
}
