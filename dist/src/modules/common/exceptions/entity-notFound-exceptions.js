"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class EntityNotFoundException extends common_1.HttpException {
    constructor(entityName) {
        super(`${entityName}, no existe o fue eliminada`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.EntityNotFoundException = EntityNotFoundException;
//# sourceMappingURL=entity-notFound-exceptions.js.map