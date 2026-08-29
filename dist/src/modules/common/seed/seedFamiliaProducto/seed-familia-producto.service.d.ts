import { Linea } from 'src/modules/gestion-productos/linea/domain/entities/linea.entity';
import { Marca } from 'src/modules/gestion-productos/marca/domain/entities/marca.entity';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { Proveedor } from 'src/modules/organizacion/proveedor/domain/entities/proveedor.entity';
import { Repository } from 'typeorm';
export declare class SeedFamiliaProductoService {
    private readonly lineaRepository;
    private readonly marcaRepository;
    private readonly proveedorRepository;
    private readonly usuarioRepository;
    constructor(lineaRepository: Repository<Linea>, marcaRepository: Repository<Marca>, proveedorRepository: Repository<Proveedor>, usuarioRepository: Repository<Usuario>);
    seedLineas(): Promise<void>;
    seedMarcas(): Promise<void>;
    runAllSeeds(): Promise<void>;
}
