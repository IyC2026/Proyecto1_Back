"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteQueryHelper = void 0;
class ClienteQueryHelper {
    static joinCliente(qb, alias = 'doc') {
        qb
            .leftJoinAndSelect(`${alias}.cliente`, 'cliente');
        return qb;
    }
}
exports.ClienteQueryHelper = ClienteQueryHelper;
//# sourceMappingURL=cliente-query.helper.js.map