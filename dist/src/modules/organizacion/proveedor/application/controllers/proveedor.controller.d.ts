import { ListadoConTotalDto } from 'src/modules/common/interface/listadoConTotalDto';
import { CondicionIvaDto } from 'src/modules/gutil/condicion-iva/dto/condicion-iva.dto';
import { DenominacionEmpresaOperadorDto } from 'src/modules/common/dto/denominacion-empresa-operador.dto';
import { LocalidadDto } from 'src/modules/gutil/localidad/dto/localidad.dto';
import { ProvinciaDto } from 'src/modules/gutil/provincia/dto/provincia.dto';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { OperadorSearchDto } from 'src/modules/gestion-documentos/operador-search.dto';
import { ProveedorService } from '../services/proveedor.service';
import { CreateProveedorDto } from '../../dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../../dto/update-proveedor.dto';
import { ProveedorDto } from '../../dto/proveedor.dto';
export declare class ProveedorController {
    private readonly service;
    private readonly logger;
    constructor(service: ProveedorService);
    private readonly ENTITY_NAME;
    create(createDto: CreateProveedorDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByDenominacionFiltered(paginationDto: DenominacionEmpresaOperadorDto): Promise<ListadoConTotalDto<OperadorSearchDto>>;
    findAllCondicionIva(): Promise<ListadoConTotalDto<CondicionIvaDto>>;
    findAllLocalidad(): Promise<ListadoConTotalDto<LocalidadDto>>;
    findAllLocalidadFor(id: number): Promise<ListadoConTotalDto<LocalidadDto>>;
    findAllProvincia(): Promise<ListadoConTotalDto<ProvinciaDto>>;
    geCondicionIvaDelCliente(id: number): Promise<import("../../../../gutil/condicion-iva/domain/entities/condicion-iva.entity").CondicionIva>;
    findOne(id: number, empresaId: number): Promise<ProveedorDto>;
    update(id: number, updateDto: UpdateProveedorDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    remove(id: number, usuarioId: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByIdConAuditoria(id: number): Promise<AuditoriaDto>;
}
