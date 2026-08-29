import { PersonalService } from '../services/personal.service';
import { CreatePersonalDto } from '../../dto/create-personal.dto';
import { UpdatePersonalDto } from '../../dto/update-personal.dto';
import { PaginationWithDenominacionDto } from 'src/modules/common/dto/busquedas/pagination-with-denominacion.dto';
import { ListadoConTotalDto } from 'src/modules/common/interface/listadoConTotalDto';
import { PersonalSearchDto } from '../../dto/personal-search.dto';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
export declare class PersonalController {
    private readonly service;
    private readonly logger;
    constructor(service: PersonalService);
    private readonly ENTITY_NAME;
    create(createDto: CreatePersonalDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByDenominacionFiltered(paginationDto: PaginationWithDenominacionDto): Promise<ListadoConTotalDto<PersonalSearchDto>>;
    findOne(id: number): Promise<import("../../dto/personal.dto").PersonalDto>;
    update(id: number, updateDto: UpdatePersonalDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    remove(id: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto>;
}
