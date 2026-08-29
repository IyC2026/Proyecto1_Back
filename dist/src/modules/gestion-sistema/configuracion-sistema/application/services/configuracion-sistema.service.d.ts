import { IConfiguracionSistemaRepository } from '../../domain/interfaces/configuracion-sistema.repository.interface';
export declare class ConfiguracionSistemaService {
    private readonly repository;
    private readonly logger;
    constructor(repository: IConfiguracionSistemaRepository);
    private readonly ENTITY_NAME;
    findDtoById(id: number): Promise<import("../../dto/configuracion-sistema.dto").ConfiguracionSistemaDto>;
    findDtoByEmpresaId(empresaId: number): Promise<{
        id: number;
        empresaId: number;
        caracteresParaBusqueda: number;
        ocultarTotalesDocumento: boolean;
        visibleSubTotalNoGravado: boolean;
        visibleSubTotal: boolean;
        visibleIva105: boolean;
        visibleIva21: boolean;
        precioConIvaVisible: boolean;
        libroCajaUnica: boolean;
        carteraChequeUnica: boolean;
        take: number;
        estadisticasProducto: boolean;
        busquedaInicial: boolean;
        maximoDolar: number;
        porcentajeAumento: number;
        unidadMedida: boolean;
        precioOferta: boolean;
        costoDolar: boolean;
        clientePoseePersonal: boolean;
        electronica: boolean;
    }>;
    findEntityById(id: number): Promise<import("../../domain/entities/configuracion-sistema.entity").ConfiguracionSistema>;
}
