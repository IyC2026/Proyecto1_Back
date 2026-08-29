"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfiguracionSistemaMapper = void 0;
const common_1 = require("@nestjs/common");
class ConfiguracionSistemaMapper {
    static toDto(entity) {
        return {
            id: entity.id,
            empresaId: entity.empresa.id,
            caracteresParaBusqueda: entity.caracteresParaBusqueda,
            ocultarTotalesDocumento: entity.ocultarTotalesDocumento,
            visibleSubTotalNoGravado: entity.visibleSubTotalNoGravado,
            visibleSubTotal: entity.visibleSubTotal,
            visibleIva105: entity.visibleIva105,
            visibleIva21: entity.visibleIva21,
            precioConIvaVisible: entity.precioConIvaVisible,
            libroCajaUnica: entity.libroCajaUnico,
            carteraChequeUnica: entity.carteraChequeUnico,
            take: entity.take,
            estadisticasProducto: entity.estadisticasProducto,
            busquedaInicial: entity.busquedaInicial,
            maximoDolar: entity.maximoDolar,
            porcentajeAumento: entity.porcentajeAumento,
            unidadMedida: entity.unidadMedida,
            precioOferta: entity.precioOferta,
            costoDolar: entity.costoDolar,
            clientePoseePersonal: entity.clientePoseePersonal,
            electronica: entity.facturaElectronica,
        };
    }
}
exports.ConfiguracionSistemaMapper = ConfiguracionSistemaMapper;
ConfiguracionSistemaMapper.logger = new common_1.Logger(ConfiguracionSistemaMapper.name);
//# sourceMappingURL=configuracion-sistema.mapper.js.map