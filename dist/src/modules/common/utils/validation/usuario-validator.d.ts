import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
export declare class UsuarioValidator {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    validarUsuarioExiste(id: number): Promise<import("../../../gestion-usuario/usuario/domain/entities/usuario.entity").Usuario>;
}
