"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinciaMapper = void 0;
class ProvinciaMapper {
    static toDto(entity) {
        return {
            id: entity.id,
            denominacion: entity.denominacion ?? '',
        };
    }
}
exports.ProvinciaMapper = ProvinciaMapper;
//# sourceMappingURL=provincia.mapper.js.map