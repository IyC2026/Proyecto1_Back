import { CondicionIvaService } from '../services/condicion-iva.service';
import { CreateCondicionIvaDto } from '../../dto/create-condicion-iva.dto';
import { UpdateCondicionIvaDto } from '../../dto/update-condicion-iva.dto';
import { PaginationWithDenominacionDto } from 'src/modules/common/dto/busquedas/pagination-with-denominacion.dto';
import { CondicionIvaDto } from '../../dto/condicion-iva.dto';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
export declare class CondicionIvaController {
    private readonly service;
    private readonly logger;
    constructor(service: CondicionIvaService);
    private readonly ENTITY_NAME;
    create(createDto: CreateCondicionIvaDto): Promise<import("../../domain/entities/condicion-iva.entity").CondicionIva>;
    findByDenominacionFiltered(paginationDto: PaginationWithDenominacionDto): Promise<{
        data: CondicionIvaDto[];
        total: number;
    }>;
    findAllFor(): Promise<import("../../../../common/interface/listadoConTotalDto").ListadoConTotalDto<CondicionIvaDto>>;
    findOne(id: number): Promise<CondicionIvaDto>;
    update(id: number, updateDto: UpdateCondicionIvaDto): Promise<import("../../domain/entities/condicion-iva.entity").CondicionIva>;
    remove(id: number): Promise<import("../../domain/entities/condicion-iva.entity").CondicionIva>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto>;
}
