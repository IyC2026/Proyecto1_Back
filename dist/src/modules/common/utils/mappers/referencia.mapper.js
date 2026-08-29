"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toReferenciaDto = toReferenciaDto;
exports.toReferenciaDtoOrEmpty = toReferenciaDtoOrEmpty;
function toReferenciaDto(entity) {
    if (!entity) {
        throw new Error('Entidad nula al mapear ReferenciaDto');
    }
    return {
        id: entity.id,
        denominacion: entity.denominacion,
    };
}
function toReferenciaDtoOrEmpty(entity) {
    return entity ? toReferenciaDto(entity) : EMPTY_REFERENCIA;
}
const EMPTY_REFERENCIA = {
    id: 0,
    denominacion: ""
};
//# sourceMappingURL=referencia.mapper.js.map