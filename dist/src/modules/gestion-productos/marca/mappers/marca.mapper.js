"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarcaMapper = void 0;
const common_1 = require("@nestjs/common");
class MarcaMapper {
    static toDto(entity) {
        return {
            id: entity.id,
            denominacion: entity.denominacion,
            observacion: entity.observacion ?? "",
            sistema: entity.sistema,
            deletedAt: entity.deletedAt ? entity.deletedAt.toISOString() : null,
        };
    }
}
exports.MarcaMapper = MarcaMapper;
MarcaMapper.logger = new common_1.Logger(MarcaMapper.name);
//# sourceMappingURL=marca.mapper.js.map