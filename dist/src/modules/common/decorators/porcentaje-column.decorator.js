"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PorcentajeColumn = PorcentajeColumn;
const typeorm_1 = require("typeorm");
function PorcentajeColumn(defaultValue = 0.0) {
    return (0, typeorm_1.Column)('decimal', {
        precision: 5,
        scale: 2,
        default: defaultValue,
        transformer: {
            to: (value) => value?.toString(),
            from: (value) => Number(value),
        },
    });
}
//# sourceMappingURL=porcentaje-column.decorator.js.map