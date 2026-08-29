"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorMapper = void 0;
const domicilio_mapper_1 = require("../../../gutil/domicilio/mappers/domicilio.mapper");
const condicion_iva_mapper_1 = require("../../../gutil/condicion-iva/mappers/condicion-iva.mapper");
const referencia_mapper_1 = require("../../../common/utils/mappers/referencia.mapper");
class ProveedorMapper {
    static toOperadorDto(proveedor, empresaId) {
        const saldo = 0;
        return {
            id: proveedor.id,
            denominacion: proveedor.denominacion ?? '',
            denominacionAfip: proveedor.denominacionAfip ?? '',
            observacion: proveedor.observacion ?? '',
            cuit: proveedor.cuit ?? '',
            dni: '',
            condicionIva: condicion_iva_mapper_1.CondicionIvaMapper.toDto(proveedor.condicionIva),
            codigo: proveedor.codigoProveedor,
            domicilio: proveedor.domicilio
                ? domicilio_mapper_1.DomicilioMapper.toDto(proveedor.domicilio)
                : undefined,
            domicilioString: 'aca va domicilio',
            saldo,
            letra: proveedor.condicionIva.letra,
            mail: '',
            sistema: proveedor.sistema,
        };
    }
    static toDto2(proveedor, empresaId) {
        const saldo = 0;
        return {
            id: proveedor.id,
            denominacion: proveedor.denominacion ?? '',
            denominacionAfip: proveedor.denominacionAfip ?? '',
            observacion: proveedor.observacion ?? '',
            cuit: proveedor.cuit ?? '',
            dni: '',
            condicionIva: condicion_iva_mapper_1.CondicionIvaMapper.toDto(proveedor.condicionIva),
            codigo: proveedor.codigoProveedor,
            domicilio: proveedor.domicilio
                ? domicilio_mapper_1.DomicilioMapper.toDto(proveedor.domicilio)
                : undefined,
            domicilioString: domicilio_mapper_1.DomicilioMapper.toString(proveedor.domicilio) ?? ' ',
            saldo,
            letra: proveedor.condicionIva.letra,
            sistema: proveedor.sistema,
            esProveedorMateriaPrima: proveedor.esProveedorMateriaPrima,
            esProveedorGastos: proveedor.esProveedorGastos,
            mail: '',
        };
    }
    static toDto(entity) {
        return {
            id: entity.id,
            denominacion: entity.denominacion,
        };
    }
    static toOperadorSearchDto(proveedor, empresaId) {
        if (!proveedor.condicionIva) {
            console.error(`Proveedor ${proveedor.id} no tiene condición IVA`);
        }
        if (!proveedor.domicilio) {
            console.error(`Proveedor ${proveedor.id} no tiene domicilio`);
        }
        const saldo = 0;
        return {
            id: proveedor.id,
            denominacion: proveedor.denominacion ?? '',
            denominacionAfip: proveedor.denominacionAfip ?? '',
            codigo: proveedor.codigoProveedor,
            observacion: proveedor.observacion ?? '',
            cuit: proveedor.cuit ?? '',
            dni: '',
            condicionIva: proveedor.condicionIva.denominacion,
            domicilioString: domicilio_mapper_1.DomicilioMapper.toString(proveedor.domicilio) ?? ' ',
            saldo,
            letra: proveedor.condicionIva.letra,
            sistema: proveedor.sistema,
            vendedor: (0, referencia_mapper_1.toReferenciaDtoOrEmpty)(null),
            esProveedorGastos: proveedor.esProveedorGastos,
            esProveedorMateriaPrima: proveedor.esProveedorMateriaPrima,
        };
    }
}
exports.ProveedorMapper = ProveedorMapper;
//# sourceMappingURL=proveedor.mapper.js.map