"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilderHelper = void 0;
class QueryBuilderHelper {
    static applyDeletedFilter(query, incluirEliminados) {
        if (incluirEliminados) {
            query.withDeleted();
        }
        return query;
    }
    static applyPagination(query, skip = 0, take = 10) {
        return query.skip(skip).take(take);
    }
    static applyOrder(query, alias, campo, orden = 'ASC') {
        return query.orderBy(`${alias}.${campo}`, orden);
    }
}
exports.QueryBuilderHelper = QueryBuilderHelper;
//# sourceMappingURL=query-builder-helpers.js.map