"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityConflictException = void 0;
const common_1 = require("@nestjs/common");
class EntityConflictException extends common_1.HttpException {
    constructor(entityName) {
        super(`Conflicto con la entidad ${entityName}`, common_1.HttpStatus.CONFLICT);
    }
}
exports.EntityConflictException = EntityConflictException;
//# sourceMappingURL=entity-confict-exceptions.js.map