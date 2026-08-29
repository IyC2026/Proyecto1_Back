import { CreateProveedorDto } from '../../dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../../dto/update-proveedor.dto';
import { IProveedorRepository } from '../../domain/interfaces/proveedor.interface';
import { LocalidadService } from 'src/modules/gutil/localidad/application/services/localidad.service';
import { CondicionIvaService } from 'src/modules/gutil/condicion-iva/application/services/condicion-iva.service';
import { GetProveedorDto } from '../../dto/get-proveedor.dto';
import { OperadorDto } from 'src/modules/gestion-documentos/operador.dto';
import { ListadoConTotalDto } from 'src/modules/common/interface/listadoConTotalDto';
import { CondicionIvaDto } from 'src/modules/gutil/condicion-iva/dto/condicion-iva.dto';
import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import { ProveedorValidationHelper } from '../../../helpers/proveedor-validation-helper';
import { LocalidadDto } from 'src/modules/gutil/localidad/dto/localidad.dto';
import { ProvinciaDto } from 'src/modules/gutil/provincia/dto/provincia.dto';
import { OperadorSearchDto } from 'src/modules/gestion-documentos/operador-search.dto';
import { ProvinciaService } from 'src/modules/gutil/provincia/application/services/provincia.service';
export declare class ProveedorService {
    private readonly repository;
    private readonly condicionIvaService;
    private readonly localidadService;
    private readonly provinciaService;
    private readonly usuarioService;
    private readonly validator;
    private readonly logger;
    constructor(repository: IProveedorRepository, condicionIvaService: CondicionIvaService, localidadService: LocalidadService, provinciaService: ProvinciaService, usuarioService: UsuarioService, validator: ProveedorValidationHelper);
    private readonly ENTITY_NAME;
    create(dto: CreateProveedorDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    update(id: number, dto: UpdateProveedorDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findBy(empresaId: number, denominacion: string, condicionIvaId: number, conSaldo?: boolean, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: OperadorSearchDto[];
        total: number;
    }>;
    findAllByDenominacion(empresaId: number, denominacion: string): Promise<{
        data: OperadorDto[];
        total: number;
    }>;
    findAllByDenominacion2(empresaId: number, denominacion: string): Promise<{
        data: OperadorSearchDto[];
        total: number;
    }>;
    findAllByTipo(empresaId: number, denominacion: string, compra: boolean, gasto: boolean): Promise<{
        data: OperadorSearchDto[];
        total: number;
    }>;
    findAllCondicionIva(): Promise<ListadoConTotalDto<CondicionIvaDto>>;
    findAllLocalidad(): Promise<ListadoConTotalDto<LocalidadDto>>;
    findAllLocalidadFor(provinciaId: number): Promise<ListadoConTotalDto<LocalidadDto>>;
    findAllProvincia(): Promise<ListadoConTotalDto<ProvinciaDto>>;
    buscarCondicionIvaDesdeCliente(id: number): Promise<import("../../../../gutil/condicion-iva/domain/entities/condicion-iva.entity").CondicionIva>;
    findByIdConAuditoria(id: number): Promise<import("../../../../gestion-sistema/auditoria/dto/auditoria.dto").AuditoriaDto>;
    findDtoById(id: number, empresaId: number): Promise<import("../../dto/proveedor.dto").ProveedorDto>;
    findEntityById(id: number): Promise<import("../../domain/entities/proveedor.entity").Proveedor>;
    remove(id: number, usuarioId: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    private checkDenominacionExists;
    findAllFor(denominacion: string): Promise<{
        data: GetProveedorDto[];
        total: number;
    }>;
    findAllSistemaFor(denominacion: string): Promise<{
        data: GetProveedorDto[];
        total: number;
    }>;
    findAllSinSistemaFor(denominacion: string): Promise<{
        data: GetProveedorDto[];
        total: number;
    }>;
}
