"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorQueryHelper = void 0;
class ProveedorQueryHelper {
    static joinProveedor(qb, alias = 'op') {
        qb
            .leftJoinAndSelect(`${alias}.proveedor`, 'proveedor');
        return qb;
    }
}
exports.ProveedorQueryHelper = ProveedorQueryHelper;
//# sourceMappingURL=proveedor-query.helper.js.map