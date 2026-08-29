"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureNotSistemaEntity = ensureNotSistemaEntity;
const common_1 = require("@nestjs/common");
function ensureNotSistemaEntity(entity, entityName) {
    if (entity.sistema === 1) {
        throw new common_1.ForbiddenException(`${entityName} marcado como del sistema y no puede ser modificado o eliminado`);
    }
}
//# sourceMappingURL=atrituto-sistema.js.map