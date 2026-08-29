import { SeedAllService } from './seed-all.service';
export declare class SeedAllController {
    private readonly seedService;
    private readonly logger;
    constructor(seedService: SeedAllService);
    executeSeed(): Promise<void>;
}
