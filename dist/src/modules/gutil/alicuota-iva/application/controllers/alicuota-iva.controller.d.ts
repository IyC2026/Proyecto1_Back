import { CreateAlicuotaIvaDto } from '../../dto/create-alicuota-iva.dto';
import { UpdateAlicuotaIvaDto } from '../../dto/update-alicuota-iva.dto';
import { AlicuotaIvaService } from '../services/alicuota-iva.service';
import { PaginationWithDenominacionDto } from 'src/modules/common/dto/busquedas/pagination-with-denominacion.dto';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { AlicuotaIvaDto } from '../../dto/alicuota-iva.dto';
export declare class AlicuotaIvaController {
    private readonly service;
    private readonly logger;
    constructor(service: AlicuotaIvaService);
    private readonly ENTITY_NAME;
    create(createDto: CreateAlicuotaIvaDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByDenominacionFiltered(paginationDto: PaginationWithDenominacionDto): Promise<{
        data: AlicuotaIvaDto[];
        total: number;
    }>;
    findOne(id: number): Promise<AlicuotaIvaDto>;
    update(id: number, updateDto: UpdateAlicuotaIvaDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    remove(id: number, usuarioId: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto>;
}
