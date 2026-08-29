import { SeedOrganizacionService } from './seed-organizacion.service';
export declare class SeedOrganizacionController {
    private readonly seedService;
    constructor(seedService: SeedOrganizacionService);
    private readonly logger;
    executeSeed(): Promise<void>;
}
