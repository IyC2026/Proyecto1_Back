import { SeedUsuarioService } from './seed-usuario.service';
export declare class SeedUsuarioController {
    private readonly seedService;
    constructor(seedService: SeedUsuarioService);
    private readonly logger;
    executeSeed(): Promise<void>;
}
