import { SeedOrganizacionService } from '../seed-organizacion/seed-organizacion.service';
import { SeedFamiliaProductoService } from '../seedFamiliaProducto/seed-familia-producto.service';
import { SeedUsuarioService } from '../seed-usuario/seed-usuario.service';
export declare class SeedAllService {
    private readonly seedUsuarioService;
    private readonly seedOrganizacionService;
    private readonly seedArticuloService;
    private readonly logger;
    constructor(seedUsuarioService: SeedUsuarioService, seedOrganizacionService: SeedOrganizacionService, seedArticuloService: SeedFamiliaProductoService);
    runAllSeeds(): Promise<void>;
}
