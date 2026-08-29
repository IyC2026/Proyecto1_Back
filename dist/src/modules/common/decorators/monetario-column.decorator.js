"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonetarioColumn = MonetarioColumn;
const typeorm_1 = require("typeorm");
function MonetarioColumn(defaultValue = 0) {
    return (0, typeorm_1.Column)('decimal', {
        precision: 15,
        scale: 5,
        default: defaultValue,
        transformer: {
            to: (value) => value?.toString(),
            from: (value) => Number(value),
        },
    });
}
//# sourceMappingURL=monetario-column.decorator.js.map