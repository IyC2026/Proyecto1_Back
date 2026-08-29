"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactorColumn = FactorColumn;
const typeorm_1 = require("typeorm");
function FactorColumn(defaultValue = 0.0) {
    return (0, typeorm_1.Column)('decimal', {
        precision: 7,
        scale: 5,
        default: defaultValue,
        transformer: {
            to: (value) => value?.toString(),
            from: (value) => Number(value),
        },
    });
}
//# sourceMappingURL=factor-column.decorator.js.map