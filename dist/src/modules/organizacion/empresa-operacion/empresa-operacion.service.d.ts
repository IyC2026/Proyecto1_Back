import { CreateEmpresaOperacionDto } from './dto/create-empresa-operacion.dto';
import { UpdateEmpresaOperacionDto } from './dto/update-empresa-operacion.dto';
export declare class EmpresaOperacionService {
    create(createEmpresaOperacionDto: CreateEmpresaOperacionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEmpresaOperacionDto: UpdateEmpresaOperacionDto): string;
    remove(id: number): string;
}
