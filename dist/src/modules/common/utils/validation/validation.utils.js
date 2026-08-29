"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidFilter = isValidFilter;
function isValidFilter(value, excludeValue) {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'string' && value.trim() === '') {
        return false;
    }
    if (excludeValue !== undefined && value === excludeValue) {
        return false;
    }
    return true;
}
//# sourceMappingURL=validation.utils.js.map