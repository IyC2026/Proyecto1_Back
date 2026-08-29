import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import { CondicionIvaValidationHelper } from 'src/modules/gutil/condicion-iva/helpers/condicion-iva-validation-helper';
import { CreateProveedorDto } from '../proveedor/dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../proveedor/dto/update-proveedor.dto';
import { IProveedorRepository } from '../proveedor/domain/interfaces/proveedor.interface';
import { CondicionIva } from 'src/modules/gutil/condicion-iva/domain/entities/condicion-iva.entity';
export declare class ProveedorValidationHelper {
    private readonly condicionIvaValidationHelper;
    private readonly usuarioService;
    private readonly proveedorRepository;
    private readonly logger;
    constructor(condicionIvaValidationHelper: CondicionIvaValidationHelper, usuarioService: UsuarioService, proveedorRepository: IProveedorRepository);
    validateAndGetCondicionIva(dto: CreateProveedorDto | UpdateProveedorDto): Promise<CondicionIva>;
    validateAndGetUsuario(id: number): Promise<import("../../gestion-usuario/usuario/domain/entities/usuario.entity").Usuario>;
    validateAndGetCuitUnique(cuit?: string, idProveedorActual?: number): Promise<void>;
    validateAndGetDenominacionUnique(denominacion: string, id: number): Promise<void>;
    validateCreateProveedor(dto: CreateProveedorDto): Promise<{
        usuario: import("../../gestion-usuario/usuario/domain/entities/usuario.entity").Usuario;
        categoriaIVA: CondicionIva;
    }>;
    validateUpdateProveedor(id: number, dto: UpdateProveedorDto): Promise<{
        usuario: import("../../gestion-usuario/usuario/domain/entities/usuario.entity").Usuario;
        categoriaIVA: CondicionIva;
    }>;
}
