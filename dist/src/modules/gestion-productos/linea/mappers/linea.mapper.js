"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineaMapper = void 0;
const common_1 = require("@nestjs/common");
class LineaMapper {
    static toDto(entity) {
        return {
            id: entity.id,
            denominacion: entity.denominacion,
            stockMinimo: entity.stockMinimo,
            utilizaStockMinimo: entity.utilizaStockMinimo,
            observacion: entity.observacion ?? '',
            sistema: entity.sistema,
            deletedAt: entity.deletedAt ? entity.deletedAt.toISOString() : null,
        };
    }
}
exports.LineaMapper = LineaMapper;
LineaMapper.logger = new common_1.Logger(LineaMapper.name);
//# sourceMappingURL=linea.mapper.js.map