"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePersistenceAdapter = void 0;
class BasePersistenceAdapter {
    constructor(repository) {
        this.repository = repository;
    }
    baseQuery(incluirEliminados = false) {
        const query = this.repository.createQueryBuilder(this.ALIAS);
        incluirEliminados
            ? query.withDeleted()
            : query.where(`${this.ALIAS}.deletedAt IS NULL`);
        return query;
    }
    baseQueryWithDeleted() {
        return this.repository.createQueryBuilder(this.ALIAS).withDeleted();
    }
}
exports.BasePersistenceAdapter = BasePersistenceAdapter;
//# sourceMappingURL=base-persistence.adapter.js.map