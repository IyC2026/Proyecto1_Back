"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioMapper = void 0;
const common_1 = require("@nestjs/common");
class UsuarioMapper {
    static toDto(entity) {
        return {
            id: entity.id,
            denominacion: entity.denominacion,
        };
    }
}
exports.UsuarioMapper = UsuarioMapper;
UsuarioMapper.logger = new common_1.Logger(UsuarioMapper.name);
//# sourceMappingURL=usuario.mapper.js.map