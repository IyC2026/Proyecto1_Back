import { PaginationWithDenominacionDto } from 'src/modules/common/dto/busquedas/pagination-with-denominacion.dto';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';
import { EmpresaService } from '../services/empresa.service';
import { UpdateEmpresaDto } from '../../dto/update-empresa.dto';
import { CreateEmpresaDto } from '../../dto/create-empresa.dto';
export declare class EmpresaController {
    private readonly service;
    private readonly logger;
    constructor(service: EmpresaService);
    private readonly ENTITY_NAME;
    create(createDto: CreateEmpresaDto): Promise<import("../../domain/entities/empresa.entity").Empresa>;
    findAll(paginationDto: PaginationDto): Promise<import("../../domain/entities/empresa.entity").Empresa[]>;
    findByDenominacionFiltered(paginationDto: PaginationWithDenominacionDto): Promise<import("../../domain/entities/empresa.entity").Empresa[]>;
    findOne(id: number): Promise<import("../../domain/entities/empresa.entity").Empresa>;
    update(id: number, updateDto: UpdateEmpresaDto): Promise<import("../../domain/entities/empresa.entity").Empresa>;
    remove(id: number): Promise<import("../../domain/entities/empresa.entity").Empresa>;
}
