"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicuotaIvaMapper = void 0;
class AlicuotaIvaMapper {
    static toDto(entity) {
        return {
            id: entity.id,
            denominacion: entity.denominacion ?? '',
            alicuota: entity.alicuota,
            observacion: entity.observacion ?? '',
            sistema: entity.sistema
        };
    }
}
exports.AlicuotaIvaMapper = AlicuotaIvaMapper;
//# sourceMappingURL=alicuota-iva.mapper.js.map