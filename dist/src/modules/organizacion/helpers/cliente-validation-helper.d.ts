import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import { CreateClienteDto } from '../cliente/dto/create-cliente.dto';
import { UpdateClienteDto } from '../cliente/dto/update-cliente.dto';
import { CondicionIvaValidationHelper } from 'src/modules/gutil/condicion-iva/helpers/condicion-iva-validation-helper';
import { IClienteRepository } from '../cliente/domain/interfaces/cliente.interface';
import { Personal } from '../personal/domain/entities/personal.entity';
import { PersonalService } from '../personal/application/services/personal.service';
import { CondicionIva } from 'src/modules/gutil/condicion-iva/domain/entities/condicion-iva.entity';
export declare class ClienteValidationHelper {
    private readonly condicionIvaValidationHelper;
    private readonly usuarioService;
    private readonly personalService;
    private readonly clienteRepository;
    private readonly logger;
    constructor(condicionIvaValidationHelper: CondicionIvaValidationHelper, usuarioService: UsuarioService, personalService: PersonalService, clienteRepository: IClienteRepository);
    validateAndGetCondicionIva(dto: CreateClienteDto | UpdateClienteDto): Promise<CondicionIva>;
    validateAndGetPersonal(dto: CreateClienteDto | UpdateClienteDto): Promise<Personal>;
    validateAndGetUsuario(id: number): Promise<import("../../gestion-usuario/usuario/domain/entities/usuario.entity").Usuario>;
    validateAndGetCuitUnique(cuit?: string, idActual?: number): Promise<void>;
    validateAndGetDniUnique(dni?: string, idActual?: number): Promise<void>;
    validateAndGetDenominacionUnique(denominacion: string, id: number): Promise<void>;
    validateCreateCliente(dto: CreateClienteDto): Promise<{
        usuario: import("../../gestion-usuario/usuario/domain/entities/usuario.entity").Usuario;
        categoriaIVA: CondicionIva;
        personal: Personal;
    }>;
    validateUpdateCliente(id: number, dto: UpdateClienteDto): Promise<{
        usuario: import("../../gestion-usuario/usuario/domain/entities/usuario.entity").Usuario;
        categoriaIVA: CondicionIva;
        personal: Personal;
    }>;
}
