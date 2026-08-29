"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CantidadColumn = CantidadColumn;
const typeorm_1 = require("typeorm");
function CantidadColumn(defaultValue = 0) {
    return (0, typeorm_1.Column)('decimal', {
        precision: 12,
        scale: 3,
        default: defaultValue,
        transformer: {
            to: (value) => value?.toString(),
            from: (value) => Number(value),
        },
    });
}
//# sourceMappingURL=cantidad-column.decorator.js.map