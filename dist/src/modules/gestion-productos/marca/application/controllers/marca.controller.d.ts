import { CreateMarcaDto } from '../../dto/create-marca.dto';
import { UpdateMarcaDto } from '../../dto/update-marca.dto';
import { PaginationWithDenominacionDto } from 'src/modules/common/dto/busquedas/pagination-with-denominacion.dto';
import { MarcaDto } from '../../dto/marca.dto';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { MarcaService } from '../services/marca.service';
export declare class MarcaController {
    private readonly service;
    private readonly logger;
    constructor(service: MarcaService);
    private readonly ENTITY_NAME;
    create(createDto: CreateMarcaDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByDenominacionFiltered(paginationDto: PaginationWithDenominacionDto): Promise<{
        data: MarcaDto[];
        total: number;
    }>;
    findOne(id: number): Promise<MarcaDto>;
    update(id: number, updateDto: UpdateMarcaDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    remove(id: number, usuarioId: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto>;
}
