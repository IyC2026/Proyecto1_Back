"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomicilioMapper = void 0;
class DomicilioMapper {
    static toDto(entity) {
        return {
            id: entity.id,
            direccion: entity.direccion ?? '',
            localidadId: entity.localidad?.id ?? null,
            localidad: entity.localidad?.denominacion ?? '',
            provinciaId: entity.localidad?.provincia?.id ?? null,
            provincia: entity.localidad?.provincia?.denominacion ?? '',
        };
    }
    static toString(entity) {
        const direccion = entity.direccion ?? '';
        const localidad = entity.localidad?.denominacion ?? '';
        const provincia = entity.localidad?.provincia?.denominacion ?? '';
        return `${direccion} ${localidad} ${provincia}`.trim();
    }
}
exports.DomicilioMapper = DomicilioMapper;
//# sourceMappingURL=domicilio.mapper.js.map