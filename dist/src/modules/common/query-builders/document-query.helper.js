"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentQueryHelper = void 0;
class DocumentQueryHelper {
    static joinDocumentoBase(qb, alias = 'op') {
        qb
            .leftJoinAndSelect(`${alias}.numeroDocumento`, 'numeroDocumento')
            .leftJoinAndSelect(`${alias}.empresa`, 'empresa')
            .leftJoinAndSelect(`${alias}.puntoVenta`, 'puntoVenta');
        return qb;
    }
}
exports.DocumentQueryHelper = DocumentQueryHelper;
//# sourceMappingURL=document-query.helper.js.map