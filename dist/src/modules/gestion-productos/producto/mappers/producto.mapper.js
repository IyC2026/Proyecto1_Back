"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoMapper = void 0;
const common_1 = require("@nestjs/common");
const referencia_mapper_1 = require("../../../common/utils/mappers/referencia.mapper");
class ProductoMapper {
    static toBusquedaDto(entity) {
        const precio = entity.precio ?? 0;
        const alicuota = entity.alicuotaIva ?? 0;
        return {
            id: entity.id,
            denominacion: entity.denominacion,
            observacion: entity.observacion ?? '',
            codigoProveedorDenominacion: entity.codigoProveedor + ' - ' + entity.denominacion,
            codigoProveedor: entity.codigoProveedor ?? '',
            proveedor: '',
            stock: entity.stock,
            alicuota: alicuota,
            costo: entity.costo ?? 0,
            precio: precio,
            precioConIva: +(precio * (1 + alicuota / 100)).toFixed(2),
            ubicacion: entity.ubicacion ?? '',
            utilizaStockMinimo: entity.utilizaStockMinimo,
            stockMinimo: entity.stockMinimo,
            utilizaPack: entity.utilizaPack,
            cantidadPorPack: entity.cantidadPorPack ?? 0,
            sistema: entity.sistema,
            codigoReferencia: entity.codigoReferencia ?? '',
        };
    }
    static mapPrecios(entity, dto, usuario) {
        entity.costo = dto.costo;
        entity.costoDolar = dto.costoDolar;
        entity.cotizacionDolar = dto.cotizacionDolar;
        entity.fechaCostoDolar = new Date();
        entity.fechaCosto = new Date();
        entity.usuarioUpdated = usuario;
    }
    static toDto(entity) {
        const alicuota = entity.alicuotaIva ?? 0;
        const precio = entity.precio ?? 0;
        return {
            id: entity.id,
            denominacion: entity.denominacion,
            observacion: entity.observacion ?? '',
            codigoProveedor: entity.codigoProveedor ?? '',
            codigoBarra: entity.codigoBarra ?? '',
            stock: entity.stock ?? 0,
            costo: entity.costo ?? 0,
            precio: entity.precio ?? 0,
            porcentaje: entity.porcentaje ?? 0,
            costoEnDolar: entity.costoEnDolar ?? false,
            costoDolar: entity.costoDolar ?? 0,
            cotizacionDolar: entity.cotizacionDolar ?? 0,
            precioDolar: entity.precioDolar ?? 0,
            destacado: entity.destacado ?? false,
            envioGratis: entity.envioGratis ?? false,
            linea: (0, referencia_mapper_1.toReferenciaDto)(entity.linea),
            marca: (0, referencia_mapper_1.toReferenciaDto)(entity.marca),
            alicuotaIva: entity.alicuotaIva,
            ubicacion: entity.ubicacion ?? '',
            utilizaStockMinimo: entity.utilizaStockMinimo ?? false,
            stockMinimo: entity.stockMinimo ?? 0,
            utilizaPack: entity.utilizaPack ?? false,
            cantidadPorPack: entity.cantidadPorPack ?? 0,
            sistema: entity.sistema,
            codigoReferencia: entity.codigoReferencia ?? '',
        };
    }
}
exports.ProductoMapper = ProductoMapper;
ProductoMapper.logger = new common_1.Logger(ProductoMapper.name);
//# sourceMappingURL=producto.mapper.js.map