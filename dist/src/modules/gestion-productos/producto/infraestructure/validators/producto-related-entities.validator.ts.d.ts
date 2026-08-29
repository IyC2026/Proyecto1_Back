import { MarcaService } from '../../../marca/application/services/marca.service';
import { LineaService } from '../../../linea/application/services/linea.service';
export declare class ProductoRelatedEntitiesValidator {
    private readonly marcaService;
    private readonly lineaService;
    constructor(marcaService: MarcaService, lineaService: LineaService);
    validarYObtenerEntidadesRelacionadas(marcaId: number, lineaId: number): Promise<{
        marca: any;
        linea: any;
    }>;
    private validarEntidadExiste;
}
