import { CreateClienteDto } from '../../dto/create-cliente.dto';
import { UpdateClienteDto } from '../../dto/update-cliente.dto';
import { IClienteRepository } from '../../domain/interfaces/cliente.interface';
import { LocalidadService } from 'src/modules/gutil/localidad/application/services/localidad.service';
import { CondicionIvaService } from 'src/modules/gutil/condicion-iva/application/services/condicion-iva.service';
import { ListadoConTotalDto } from 'src/modules/common/interface/listadoConTotalDto';
import { CondicionIvaDto } from 'src/modules/gutil/condicion-iva/dto/condicion-iva.dto';
import { LocalidadDto } from 'src/modules/gutil/localidad/dto/localidad.dto';
import { ProvinciaDto } from 'src/modules/gutil/provincia/dto/provincia.dto';
import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import { ClienteValidationHelper } from '../../../helpers/cliente-validation-helper';
import { OperadorSearchDto } from 'src/modules/gestion-documentos/operador-search.dto';
import { PersonalService } from '../../../personal/application/services/personal.service';
import { PersonalSearchDto } from '../../../personal/dto/personal-search.dto';
import { EmpresaService } from '../../../empresa/application/services/empresa.service';
import { ProvinciaService } from 'src/modules/gutil/provincia/application/services/provincia.service';
export declare class ClienteService {
    private readonly repository;
    private readonly condicionIvaService;
    private readonly localidadService;
    private readonly provinciaService;
    private readonly personalService;
    private readonly usuarioService;
    private readonly empresaService;
    private readonly validator;
    private readonly logger;
    constructor(repository: IClienteRepository, condicionIvaService: CondicionIvaService, localidadService: LocalidadService, provinciaService: ProvinciaService, personalService: PersonalService, usuarioService: UsuarioService, empresaService: EmpresaService, validator: ClienteValidationHelper);
    private readonly ENTITY_NAME;
    create(dto: CreateClienteDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    update(id: number, dto: UpdateClienteDto): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    findByDenominacionFiltered(empresaId: number, denominacion: string, condicionIvaId: number, conSaldo?: boolean, skip?: number, take?: number, incluirEliminados?: boolean): Promise<{
        data: OperadorSearchDto[];
        total: number;
    }>;
    findAllByDenominacion(empresaId: number, denominacion: string): Promise<{
        data: OperadorSearchDto[];
        total: number;
    }>;
    findAllByDenominacionAndCodigo(empresaId: number, denominacion: string): Promise<{
        data: OperadorSearchDto[];
        total: number;
    }>;
    findAllByVendedorDenominacion(denominacion: string): Promise<{
        data: PersonalSearchDto[];
        total: number;
    }>;
    findAllCondicionIva(): Promise<ListadoConTotalDto<CondicionIvaDto>>;
    findAllLocalidad(): Promise<ListadoConTotalDto<LocalidadDto>>;
    findAllLocalidadFor(provinciaId: number): Promise<ListadoConTotalDto<LocalidadDto>>;
    findAllProvincia(): Promise<ListadoConTotalDto<ProvinciaDto>>;
    buscarCondicionIvaDesdeCliente(id: number): Promise<import("../../../../gutil/condicion-iva/domain/entities/condicion-iva.entity").CondicionIva>;
    findByIdConAuditoria(id: number): Promise<import("../../../../gestion-sistema/auditoria/dto/auditoria.dto").AuditoriaDto>;
    findDtoById(id: number, empresaId: number): Promise<import("../../../../gestion-documentos/operador.dto").OperadorDto>;
    findEntityById(id: number): Promise<import("../../domain/entities/cliente.entity").Cliente>;
    findEntityByIdWithRelations(id: number): Promise<import("../../domain/entities/cliente.entity").Cliente>;
    remove(id: number, usuarioId: number): Promise<import("../../../../common/utils/message/mensajeDto").MensajeDto<any>>;
    private checkDenominacionExists;
    private checkCuitOrDniExists;
}
