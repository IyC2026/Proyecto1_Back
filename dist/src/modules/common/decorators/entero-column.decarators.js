"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnteroColumn = EnteroColumn;
const typeorm_1 = require("typeorm");
function EnteroColumn(defaultValue = 0) {
    return (0, typeorm_1.Column)('int', {
        default: defaultValue,
        transformer: {
            to: (value) => Number(value),
            from: (value) => Number(value),
        },
    });
}
//# sourceMappingURL=entero-column.decarators.js.map