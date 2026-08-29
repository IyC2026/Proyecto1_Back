import { CreateRolDto } from '../../dto/create-rol.dto';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';
import { UpdateRolDto } from '../../dto/update-rol.dto';
import { RolService } from '../services/rol.service';
import { PaginationWithDenominacionDto } from 'src/modules/common/dto/busquedas/pagination-with-denominacion.dto';
export declare class RolController {
    private readonly service;
    private readonly logger;
    constructor(service: RolService);
    private readonly ENTITY_NAME;
    create(createDto: CreateRolDto): Promise<import("../../domain/entities/rol.entity").Rol>;
    findAll(paginationDto: PaginationDto): Promise<import("../../domain/entities/rol.entity").Rol[]>;
    findOne(id: number): Promise<import("../../domain/entities/rol.entity").Rol>;
    findByDenominacionFiltered(paginationDto: PaginationWithDenominacionDto): Promise<import("../../domain/entities/rol.entity").Rol[]>;
    update(id: number, updateDto: UpdateRolDto): Promise<import("../../domain/entities/rol.entity").Rol>;
    remove(id: number): Promise<import("../../domain/entities/rol.entity").Rol>;
}
