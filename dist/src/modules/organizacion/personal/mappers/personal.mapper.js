"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalMapper = void 0;
class PersonalMapper {
    static toSearchDto(entity) {
        return {
            id: entity.id,
            denominacion: entity.denominacion ?? '',
            domicilioString: '',
            createdAt: entity.createdAt,
            sistema: entity.sistema,
            deletedAt: entity.deletedAt ? entity.deletedAt.toISOString() : null,
        };
    }
    static toDto(personal) {
        return {
            id: personal.id,
            denominacion: personal.denominacion ?? '',
            observacion: personal.observacion ?? '',
            mail: personal.mail,
            esVendedor: personal.esVendedor,
            createdAt: personal.createdAt,
        };
    }
}
exports.PersonalMapper = PersonalMapper;
//# sourceMappingURL=personal.mapper.js.map