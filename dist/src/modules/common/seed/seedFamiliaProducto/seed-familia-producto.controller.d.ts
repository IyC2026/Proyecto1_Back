import { SeedFamiliaProductoService } from './seed-familia-producto.service';
export declare class SeedFamiliaProductoController {
    private readonly seedService;
    constructor(seedService: SeedFamiliaProductoService);
    private readonly logger;
    executeSeed(): Promise<void>;
}
