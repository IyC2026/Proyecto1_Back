"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmUnitOfWork = void 0;
class TypeOrmUnitOfWork {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.queryRunner = null;
    }
    async start() {
        this.queryRunner = this.dataSource.createQueryRunner();
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
    }
    async commit() {
        if (!this.queryRunner) {
            throw new Error('QueryRunner no inicializado. Llamá a start() primero.');
        }
        await this.queryRunner.commitTransaction();
    }
    async rollback() {
        if (!this.queryRunner) {
            throw new Error('QueryRunner no inicializado. Llamá a start() primero.');
        }
        await this.queryRunner.rollbackTransaction();
    }
    async release() {
        if (!this.queryRunner) {
            throw new Error('QueryRunner no inicializado. Llamá a start() primero.');
        }
        await this.queryRunner.release();
        this.queryRunner = null;
    }
    getManager() {
        if (!this.queryRunner) {
            throw new Error('QueryRunner no inicializado. Llamá a start() primero.');
        }
        return this.queryRunner.manager;
    }
    getRepository(repo) {
        if (!this.queryRunner) {
            throw new Error('QueryRunner no inicializado. Llamá a start() primero.');
        }
        return this.queryRunner.manager.getRepository(repo);
    }
}
exports.TypeOrmUnitOfWork = TypeOrmUnitOfWork;
//# sourceMappingURL=type-orm-unit-of-works.js.map