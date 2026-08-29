import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import { IMarcaRepository } from '../../domain/interfaces/marca.repository.interface';
import { UpdateMarcaDto } from '../../dto/update-marca.dto';
import { CreateMarcaDto } from '../../dto/create-marca.dto';
import { MarcaDto } from '../../dto/marca.dto';
import { PoliticaEliminacionMarca } from '../../domain/services/politica-eliminacion-marca.service';
import { Marca } from '../../domain/entities/marca.entity';
export declare class MarcaService {
    private readonly repository;
    private readonly usuarioService;
    private readonly validacionesService;
    private readonly logger;
    constructor(repository: IMarcaRepository, usuarioService: UsuarioService, validacionesService: PoliticaEliminacionMarca);
    private readonly ENTITY_NAME;
    create(dto: CreateMarcaDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    update(id: number, dto: UpdateMarcaDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findAllFor(denominacion: string): Promise<{
        data: MarcaDto[];
        total: number;
    }>;
    findAllListado(): Promise<Marca[]>;
    findAllSinSistemaFor(denominacion: string): Promise<{
        data: MarcaDto[];
        total: number;
    }>;
    findAllSistemaFor(denominacion: string): Promise<{
        data: MarcaDto[];
        total: number;
    }>;
    findBy(denominacion: string, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: MarcaDto[];
        total: number;
    }>;
    findDtoById(id: number): Promise<MarcaDto>;
    findEntityById(id: number): Promise<Marca>;
    remove(id: number, usuarioId: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    private checkDenominacionExists;
    findByIdConAuditoria(id: number): Promise<import("../../../../gestion-sistema/auditoria/dto/auditoria.dto").AuditoriaDto>;
    findByDenominacionFiltered(findByDenominacionFiltered: any): Promise<void>;
}
