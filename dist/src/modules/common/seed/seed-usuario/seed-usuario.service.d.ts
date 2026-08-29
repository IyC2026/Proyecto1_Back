import { Rol } from 'src/modules/gestion-usuario/rol/domain/entities/rol.entity';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { Repository } from 'typeorm';
export declare class SeedUsuarioService {
    private readonly rolRepository;
    private readonly usuarioRepository;
    constructor(rolRepository: Repository<Rol>, usuarioRepository: Repository<Usuario>);
    seedRol(): Promise<void>;
    seedUsuario(): Promise<void>;
    runAllSeeds(): Promise<void>;
}
