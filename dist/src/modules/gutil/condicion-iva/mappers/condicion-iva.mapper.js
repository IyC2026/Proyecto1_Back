"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CondicionIvaMapper = void 0;
class CondicionIvaMapper {
    static toDto(entity) {
        return {
            id: entity.id,
            denominacion: entity.denominacion ?? '',
            letra: entity.letra ?? '',
            observacion: entity.observacion ?? '',
            requiereCuit: entity.requiereCuit ?? false,
            requiereDocumento: entity.requiereDocumento ?? false,
            sistema: entity.sistema
        };
    }
}
exports.CondicionIvaMapper = CondicionIvaMapper;
//# sourceMappingURL=condicion-iva.mapper.js.map