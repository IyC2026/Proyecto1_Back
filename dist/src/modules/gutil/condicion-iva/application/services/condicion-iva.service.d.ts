import { CreateCondicionIvaDto } from '../../dto/create-condicion-iva.dto';
import { UpdateCondicionIvaDto } from '../../dto/update-condicion-iva.dto';
import { ICondicionIvaRepository } from '../../domain/interfaces/condicion-iva.repository.interface';
import { ListadoConTotalDto } from 'src/modules/common/interface/listadoConTotalDto';
import { CondicionIvaDto } from '../../dto/condicion-iva.dto';
import { CondicionIva } from '../../domain/entities/condicion-iva.entity';
export declare class CondicionIvaService {
    private readonly repository;
    private readonly logger;
    constructor(repository: ICondicionIvaRepository);
    private readonly ENTITY_NAME;
    create(dto: CreateCondicionIvaDto): Promise<CondicionIva>;
    update(id: number, dto: UpdateCondicionIvaDto): Promise<CondicionIva>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<{
        data: CondicionIvaDto[];
        total: number;
    }>;
    findAllFor(): Promise<ListadoConTotalDto<CondicionIvaDto>>;
    findAllSinConsumidorFinal(): Promise<ListadoConTotalDto<CondicionIvaDto>>;
    findDtoById(id: number): Promise<CondicionIvaDto>;
    findEntityById(id: number): Promise<CondicionIva>;
    remove(id: number): Promise<CondicionIva>;
    private checkDenominacionExists;
    findAllListado(): Promise<CondicionIva[]>;
    findByIdConAuditoria(id: number): Promise<import("../../../../gestion-sistema/auditoria/dto/auditoria.dto").AuditoriaDto>;
}
