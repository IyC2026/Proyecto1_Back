import { CreatePersonalDto } from '../../dto/create-personal.dto';
import { UpdatePersonalDto } from '../../dto/update-personal.dto';
import { Personal } from '../../domain/entities/personal.entity';
import { IPersonalRepository } from '../../domain/interfaces/personal.interface';
import { PersonalSearchDto } from '../../dto/personal-search.dto';
import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import { PersonalDto } from '../../dto/personal.dto';
export declare class PersonalService {
    private readonly repository;
    private readonly usuarioService;
    private readonly logger;
    constructor(repository: IPersonalRepository, usuarioService: UsuarioService);
    private readonly ENTITY_NAME;
    create(dto: CreatePersonalDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    update(id: number, dto: UpdatePersonalDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findBy(denominacion: string, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: PersonalSearchDto[];
        total: number;
    }>;
    findByIdConAuditoria(id: number): Promise<import("../../../../gestion-sistema/auditoria/dto/auditoria.dto").AuditoriaDto>;
    findDtoById(id: number): Promise<PersonalDto>;
    findEntityById(id: number): Promise<Personal>;
    findAllFor(denominacion: string): Promise<{
        data: PersonalDto[];
        total: number;
    }>;
    findAllVendedorByDenominacion(denominacion: string): Promise<{
        data: PersonalSearchDto[];
        total: number;
    }>;
    remove(id: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    private checkDenominacionExists;
    findAllListado(): Promise<Personal[]>;
}
