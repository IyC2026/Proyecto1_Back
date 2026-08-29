"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteMapper = void 0;
const domicilio_mapper_1 = require("../../../gutil/domicilio/mappers/domicilio.mapper");
const referencia_mapper_1 = require("../../../common/utils/mappers/referencia.mapper");
const condicion_iva_mapper_1 = require("../../../gutil/condicion-iva/mappers/condicion-iva.mapper");
class ClienteMapper {
    static toOperadorDto(cliente, empresaId) {
        const saldo = 0;
        return {
            id: cliente.id,
            denominacion: cliente.denominacion ?? '',
            denominacionAfip: cliente.denominacionAfip ?? '',
            observacion: cliente.observacion ?? '',
            cuit: cliente.cuit ?? '',
            dni: cliente.dni ?? '',
            condicionIva: condicion_iva_mapper_1.CondicionIvaMapper.toDto(cliente.condicionIva),
            vendedor: (0, referencia_mapper_1.toReferenciaDtoOrEmpty)(cliente.personal),
            codigo: cliente.codigo ?? '0',
            domicilio: cliente.domicilio
                ? domicilio_mapper_1.DomicilioMapper.toDto(cliente.domicilio)
                : undefined,
            domicilioString: domicilio_mapper_1.DomicilioMapper.toString(cliente.domicilio) ?? ' ',
            saldo,
            letra: cliente.condicionIva.letra,
            mail: cliente.mail ?? '',
            sistema: cliente.sistema,
        };
    }
    static toOperadorSearchDto(cliente, empresaId) {
        const saldo = 0;
        return {
            id: cliente.id,
            denominacion: cliente.denominacion ?? '',
            denominacionAfip: cliente.denominacionAfip ?? '',
            codigo: cliente.codigo ?? '-',
            observacion: cliente.observacion ?? '',
            cuit: cliente.cuit ?? '',
            dni: cliente.dni ?? '',
            condicionIva: cliente.condicionIva.denominacion,
            domicilioString: domicilio_mapper_1.DomicilioMapper.toString(cliente.domicilio) ?? ' ',
            saldo,
            letra: cliente.condicionIva.letra,
            sistema: cliente.sistema,
            vendedor: (0, referencia_mapper_1.toReferenciaDtoOrEmpty)(cliente.personal),
        };
    }
}
exports.ClienteMapper = ClienteMapper;
//# sourceMappingURL=cliente.mapper.js.map