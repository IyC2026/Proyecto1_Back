import { PaginationWithDenominacionDto } from 'src/modules/common/dto/busquedas/pagination-with-denominacion.dto';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { LineaService } from '../services/linea.service';
import { CreateLineaDto } from '../../dto/create-linea.dto';
import { LineaDto } from '../../dto/linea.dto';
import { UpdateLineaDto } from '../../dto/update-linea.dto';
export declare class LineaController {
    private readonly service;
    private readonly logger;
    constructor(service: LineaService);
    private readonly ENTITY_NAME;
    create(createDto: CreateLineaDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByDenominacionFiltered(paginationDto: PaginationWithDenominacionDto): Promise<{
        data: LineaDto[];
        total: number;
    }>;
    findOne(id: number): Promise<LineaDto>;
    update(id: number, updateDto: UpdateLineaDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    remove(id: number, usuarioId: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto>;
}
