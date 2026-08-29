import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import { ILineaRepository } from '../../domain/interfaces/linea.repository.interface';
import { CreateLineaDto } from '../../dto/create-linea.dto';
import { UpdateLineaDto } from '../../dto/update-linea.dto';
import { LineaDto } from '../../dto/linea.dto';
import { PoliticaEliminacionLinea } from '../../domain/services/politica-eliminacion-linea.service';
import { Linea } from '../../domain/entities/linea.entity';
export declare class LineaService {
    private readonly repository;
    private readonly validacionesService;
    private readonly usuarioService;
    private readonly logger;
    constructor(repository: ILineaRepository, validacionesService: PoliticaEliminacionLinea, usuarioService: UsuarioService);
    private readonly ENTITY_NAME;
    create(dto: CreateLineaDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    update(id: number, dto: UpdateLineaDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: LineaDto[];
        total: number;
    }>;
    findAllFor(denominacion: string): Promise<{
        data: LineaDto[];
        total: number;
    }>;
    findByIdConAuditoria(id: number): Promise<import("../../../../gestion-sistema/auditoria/dto/auditoria.dto").AuditoriaDto>;
    findDtoById(id: number): Promise<LineaDto>;
    findEntityById(id: number): Promise<Linea>;
    remove(id: number, usuarioId: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    private checkDenominacionExists;
    findAllListado(): Promise<Linea[]>;
}
