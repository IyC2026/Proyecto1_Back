import { CreateLocalidadDto } from '../../dto/create-localidad.dto';
import { UpdateLocalidadDto } from '../../dto/update-localidad.dto';
import { ILocalidadRepository } from '../../domain/interfaces/localidad.repository.interface';
import { ListadoConTotalDto } from 'src/modules/common/interface/listadoConTotalDto';
import { LocalidadDto } from '../../dto/localidad.dto';
import { ProvinciaDto } from '../../../provincia/dto/provincia.dto';
import { ProvinciaService } from 'src/modules/gutil/provincia/application/services/provincia.service';
import { Localidad } from '../../domain/entities/localidad.entity';
export declare class LocalidadService {
    private readonly repository;
    private readonly provinciaService;
    private readonly logger;
    constructor(repository: ILocalidadRepository, provinciaService: ProvinciaService);
    private readonly ENTITY_NAME;
    create(dto: CreateLocalidadDto): Promise<Localidad>;
    update(id: number, dto: UpdateLocalidadDto): Promise<Localidad>;
    findAllFor(): Promise<ListadoConTotalDto<LocalidadDto>>;
    findAllForProvincia(provinciaId: any): Promise<ListadoConTotalDto<LocalidadDto>>;
    findBy(denominacion: string, provinciaId: number, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: LocalidadDto[];
        total: number;
    }>;
    findDtoById(id: number): Promise<LocalidadDto>;
    findEntityById(id: number): Promise<Localidad>;
    remove(id: number): Promise<Localidad>;
    private checkDenominacionExists;
    findAllProvincia(): Promise<ListadoConTotalDto<ProvinciaDto>>;
    findByIdConAuditoria(id: number): Promise<import("../../../../gestion-sistema/auditoria/dto/auditoria.dto").AuditoriaDto>;
    findAllListado(): Promise<Localidad[]>;
}
