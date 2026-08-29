"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditoriaMapper = void 0;
const auditoria_dto_1 = require("../dto/auditoria.dto");
const fecha_utils_1 = require("../../../common/utils/date/fecha-utils");
class AuditoriaMapper {
    static mapProductoToDto(entity) {
        const dto = new auditoria_dto_1.AuditoriaDto();
        dto.id = entity.id;
        dto.detalle = 'Producto ' + entity.denominacion;
        dto.createdAt = fecha_utils_1.FechaUtils.formatFechaHora(entity.createdAt) ?? '';
        dto.updatedAt = fecha_utils_1.FechaUtils.formatFechaHora(entity.updatedAt) ?? '';
        dto.deletedAt = entity.deletedAt
            ? fecha_utils_1.FechaUtils.formatFechaHora(entity.deletedAt)
            : '';
        dto.usuarioCreated = entity.usuarioCreated.denominacion ?? '';
        dto.usuarioUpdated = entity.usuarioUpdated?.denominacion ?? '';
        dto.usuarioDeleted = entity.usuarioDeleted?.denominacion ?? '';
        return dto;
    }
    static mapClienteToDto(entity) {
        const dto = new auditoria_dto_1.AuditoriaDto();
        dto.id = entity.id;
        dto.detalle = 'Cliente ' + entity.denominacion;
        dto.createdAt = fecha_utils_1.FechaUtils.formatFechaHora(entity.createdAt) ?? '';
        dto.updatedAt = fecha_utils_1.FechaUtils.formatFechaHora(entity.updatedAt) ?? '';
        dto.deletedAt = entity.deletedAt
            ? fecha_utils_1.FechaUtils.formatFechaHora(entity.deletedAt)
            : '';
        dto.usuarioCreated = entity.usuarioCreated.denominacion ?? '';
        dto.usuarioUpdated = entity.usuarioUpdated?.denominacion ?? '';
        dto.usuarioDeleted = entity.usuarioDeleted?.denominacion ?? '';
        return dto;
    }
    static mapProveedorToDto(entity) {
        const dto = new auditoria_dto_1.AuditoriaDto();
        dto.id = entity.id;
        dto.detalle = 'Proveedor ' + entity.denominacion;
        dto.createdAt = fecha_utils_1.FechaUtils.formatFechaHora(entity.createdAt) ?? '';
        dto.updatedAt = fecha_utils_1.FechaUtils.formatFechaHora(entity.updatedAt) ?? '';
        dto.deletedAt = entity.deletedAt
            ? fecha_utils_1.FechaUtils.formatFechaHora(entity.deletedAt)
            : '';
        dto.usuarioCreated = entity.usuarioCreated.denominacion ?? '';
        dto.usuarioUpdated = entity.usuarioUpdated?.denominacion ?? '';
        dto.usuarioDeleted = entity.usuarioDeleted?.denominacion ?? '';
        return dto;
    }
    static mapPersonalToDto(entity) {
        const dto = new auditoria_dto_1.AuditoriaDto();
        dto.id = entity.id;
        dto.detalle = 'Personal ' + entity.denominacion;
        dto.createdAt = fecha_utils_1.FechaUtils.formatFechaHora(entity.createdAt) ?? '';
        dto.updatedAt = fecha_utils_1.FechaUtils.formatFechaHora(entity.updatedAt) ?? '';
        dto.deletedAt = entity.deletedAt
            ? fecha_utils_1.FechaUtils.formatFechaHora(entity.deletedAt)
            : '';
        dto.usuarioCreated = entity.usuarioCreated.denominacion ?? '';
        dto.usuarioUpdated = entity.usuarioUpdated?.denominacion ?? '';
        dto.usuarioDeleted = entity.usuarioDeleted?.denominacion ?? '';
        return dto;
    }
    static mapMarcaToDto(entity) {
        const dto = new auditoria_dto_1.AuditoriaDto();
        dto.id = entity.id;
        dto.detalle = 'MArca ' + entity.denominacion;
        dto.createdAt = fecha_utils_1.FechaUtils.formatFechaHora(entity.createdAt) ?? '';
        dto.updatedAt = fecha_utils_1.FechaUtils.formatFechaHora(entity.updatedAt) ?? '';
        dto.deletedAt = entity.deletedAt
            ? fecha_utils_1.FechaUtils.formatFechaHora(entity.deletedAt)
            : '';
        dto.usuarioCreated = '';
        dto.usuarioUpdated = '';
        dto.usuarioDeleted = '';
        return dto;
    }
}
exports.AuditoriaMapper = AuditoriaMapper;
//# sourceMappingURL=auditoria.mapper.js.map