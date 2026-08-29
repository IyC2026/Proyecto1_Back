import { LocalidadService } from '../services/localidad.service';
import { CreateLocalidadDto } from '../../dto/create-localidad.dto';
import { UpdateLocalidadDto } from '../../dto/update-localidad.dto';
import { ListadoConTotalDto } from 'src/modules/common/interface/listadoConTotalDto';
import { ProvinciaDto } from '../../../provincia/dto/provincia.dto';
import { LocalidadDto } from '../../dto/localidad.dto';
import { SearchLocalidadDto } from '../../dto/search-localidad.dto';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
export declare class LocalidadController {
    private readonly service;
    private readonly logger;
    constructor(service: LocalidadService);
    private readonly ENTITY_NAME;
    create(createDto: CreateLocalidadDto): Promise<import("../../domain/entities/localidad.entity").Localidad>;
    findByDenominacionFiltered(paginationDto: SearchLocalidadDto): Promise<{
        data: LocalidadDto[];
        total: number;
    }>;
    findOne(id: number): Promise<LocalidadDto>;
    update(id: number, updateDto: UpdateLocalidadDto): Promise<import("../../domain/entities/localidad.entity").Localidad>;
    remove(id: number): Promise<import("../../domain/entities/localidad.entity").Localidad>;
    findAllProvincia(): Promise<ListadoConTotalDto<ProvinciaDto>>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto>;
}
