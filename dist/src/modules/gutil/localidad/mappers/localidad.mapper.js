"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalidadMapper = void 0;
const referencia_mapper_1 = require("../../../common/utils/mappers/referencia.mapper");
class LocalidadMapper {
    static toDto(entity) {
        return {
            id: entity.id,
            denominacion: entity.denominacion ?? '',
            codigoPostal: entity.codigoPostal ?? '',
            sistema: entity.sistema ?? 0,
            provincia: (0, referencia_mapper_1.toReferenciaDto)(entity.provincia),
            deletedAt: entity.deletedAt ? entity.deletedAt.toISOString() : null,
        };
    }
}
exports.LocalidadMapper = LocalidadMapper;
//# sourceMappingURL=localidad.mapper.js.map