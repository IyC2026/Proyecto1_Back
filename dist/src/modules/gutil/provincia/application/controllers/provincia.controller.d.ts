import { PaginationDto } from 'src/modules/common/dto/pagination.dto';
import { PaginationWithDenominacionDto } from 'src/modules/common/dto/busquedas/pagination-with-denominacion.dto';
import { CreateProvinciaDto } from '../../dto/create-provincia.dto';
import { UpdateProvinciaDto } from '../../dto/update-provincia.dto';
import { ProvinciaService } from '../services/provincia.service';
export declare class ProvinciaController {
    private readonly service;
    private readonly logger;
    constructor(service: ProvinciaService);
    private readonly ENTITY_NAME;
    create(createDto: CreateProvinciaDto): Promise<import("../../domain/entities/provincia.entity").Provincia>;
    findAll(paginationDto: PaginationDto): Promise<import("../../domain/entities/provincia.entity").Provincia[]>;
    findByDenominacionFiltered(paginationDto: PaginationWithDenominacionDto): Promise<import("../../domain/entities/provincia.entity").Provincia[]>;
    findAllFor(): Promise<import("../../../../common/interface/listadoConTotalDto").ListadoConTotalDto<import("../../dto/provincia.dto").ProvinciaDto>>;
    findOne(id: number): Promise<import("../../domain/entities/provincia.entity").Provincia>;
    update(id: number, updateDto: UpdateProvinciaDto): Promise<import("../../domain/entities/provincia.entity").Provincia>;
    remove(id: number): Promise<import("../../domain/entities/provincia.entity").Provincia>;
}
