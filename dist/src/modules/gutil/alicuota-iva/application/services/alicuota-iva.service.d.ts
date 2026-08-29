import { CreateAlicuotaIvaDto } from '../../dto/create-alicuota-iva.dto';
import { UpdateAlicuotaIvaDto } from '../../dto/update-alicuota-iva.dto';
import { IAlicuotaIvaRepository } from '../../domain/interfaces/alicuota-iva.repository.interface';
import { AlicuotaIvaDto } from '../../dto/alicuota-iva.dto';
import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
export declare class AlicuotaIvaService {
    private readonly repository;
    private readonly usuarioService;
    private readonly logger;
    constructor(repository: IAlicuotaIvaRepository, usuarioService: UsuarioService);
    private readonly ENTITY_NAME;
    create(dto: CreateAlicuotaIvaDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    update(id: number, dto: UpdateAlicuotaIvaDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findAllFor(denominacion: string): Promise<{
        data: AlicuotaIvaDto[];
        total: number;
    }>;
    findAllSinSistemaFor(denominacion: string): Promise<{
        data: AlicuotaIvaDto[];
        total: number;
    }>;
    findAllSistemaFor(denominacion: string): Promise<{
        data: AlicuotaIvaDto[];
        total: number;
    }>;
    findBy(denominacion: string, skip?: number, take?: number): Promise<{
        data: AlicuotaIvaDto[];
        total: number;
    }>;
    findDtoById(id: number): Promise<AlicuotaIvaDto>;
    findEntityById(id: number): Promise<import("../../domain/entities/alicuota-iva.entity").AlicuotaIva>;
    remove(id: number, usuarioId: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    private checkDenominacionExists;
    findByIdConAuditoria(id: number): Promise<import("../../../../gestion-sistema/auditoria/dto/auditoria.dto").AuditoriaDto>;
}
