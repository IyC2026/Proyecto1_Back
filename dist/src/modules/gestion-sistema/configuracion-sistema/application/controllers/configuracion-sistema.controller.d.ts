import { ConfiguracionSistemaDto } from '../../dto/configuracion-sistema.dto';
import { ConfiguracionSistemaService } from '../services/configuracion-sistema.service';
export declare class ConfiguracionSistemaController {
    private readonly service;
    constructor(service: ConfiguracionSistemaService);
    getConfiguracionPorEmpresa(empresaId: number): Promise<ConfiguracionSistemaDto>;
}
