"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditoriaQueryHelper = void 0;
const fecha_utils_1 = require("../utils/date/fecha-utils");
class AuditoriaQueryHelper {
    static applyJoins(qb, alias) {
        return qb
            .leftJoin('usuario', 'usuarioCreated', `usuarioCreated.id = ${alias}.usuarioCreatedId`)
            .leftJoin('usuario', 'usuarioUpdated', `usuarioUpdated.id = ${alias}.usuarioUpdatedId`)
            .leftJoin('usuario', 'usuarioDeleted', `usuarioDeleted.id = ${alias}.usuarioDeletedId`);
    }
    static applySelect(qb, alias) {
        return qb.addSelect([
            `${alias}.id as ${alias}_id`,
            `${alias}.denominacion as ${alias}_denominacion`,
            `${alias}.createdAt as ${alias}_createdAt`,
            `${alias}.updatedAt as ${alias}_updatedAt`,
            `${alias}.deletedAt as ${alias}_deletedAt`,
            'usuarioCreated.denominacion as usuarioCreated_nombre',
            'usuarioUpdated.denominacion as usuarioUpdated_nombre',
            'usuarioDeleted.denominacion as usuarioDeleted_nombre',
        ]);
    }
    static mapToDto(raw, alias, etiqueta) {
        return {
            id: raw[`${alias}_id`] ?? 0,
            detalle: raw[`${alias}_denominacion`]
                ? `${etiqueta} ${raw[`${alias}_denominacion`]}`
                : `${etiqueta} (sin denominación)`,
            createdAt: raw[`${alias}_createdAt`]
                ? fecha_utils_1.FechaUtils.formatFechaHora(raw[`${alias}_createdAt`])
                : '',
            updatedAt: raw[`${alias}_updatedAt`]
                ? fecha_utils_1.FechaUtils.formatFechaHora(raw[`${alias}_updatedAt`])
                : '',
            deletedAt: raw[`${alias}_deletedAt`]
                ? fecha_utils_1.FechaUtils.formatFechaHora(raw[`${alias}_deletedAt`])
                : '',
            usuarioCreated: raw.usuarioCreated_nombre ?? '',
            usuarioUpdated: raw.usuarioUpdated_nombre ?? '',
            usuarioDeleted: raw.usuarioDeleted_nombre ?? '',
        };
    }
}
exports.AuditoriaQueryHelper = AuditoriaQueryHelper;
//# sourceMappingURL=auditoria-query.helper.js.map