import { BaseProductoDto } from '../interfaces/base-producto.interface';
import { UsuarioValidator } from 'src/modules/common/utils/validation/usuario-validator';
import { MarcaService } from 'src/modules/gestion-productos/marca/application/services/marca.service';
import { IProductoRepository } from '../interfaces/producto.repository-interface';
export declare class ProductoValidator {
    private readonly marcaService;
    private readonly usuarioValidator;
    private readonly repository;
    private readonly ENTITY_NAME;
    constructor(marcaService: MarcaService, usuarioValidator: UsuarioValidator, repository: IProductoRepository);
    private assertEntidadValida;
    validarMarcaLinea(dto: BaseProductoDto, tipo: number): Promise<{
        marca: any;
        linea: any;
    }>;
    private validarCamposRequeridos;
    validar(dto: BaseProductoDto, tipo: number): Promise<{
        marca: any;
        linea: any;
    }>;
    validarUsuarioExiste(id: number): Promise<import("../../../../gestion-usuario/usuario/domain/entities/usuario.entity").Usuario>;
    private validateUniqueDenominacion;
}
