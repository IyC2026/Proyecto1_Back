"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmUnitOfWork = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let TypeOrmUnitOfWork = class TypeOrmUnitOfWork {
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
        if (!this.queryRunner)
            return;
        await this.queryRunner.commitTransaction();
    }
    async rollback() {
        if (!this.queryRunner)
            return;
        await this.queryRunner.rollbackTransaction();
    }
    async release() {
        if (!this.queryRunner)
            return;
        await this.queryRunner.release();
        this.queryRunner = null;
    }
    getManager() {
        if (this.queryRunner) {
            return this.queryRunner.manager;
        }
        return this.dataSource.manager;
    }
    getRepository(entity) {
        if (this.queryRunner) {
            return this.queryRunner.manager.getRepository(entity);
        }
        return this.dataSource.getRepository(entity);
    }
};
exports.TypeOrmUnitOfWork = TypeOrmUnitOfWork;
exports.TypeOrmUnitOfWork = TypeOrmUnitOfWork = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TypeOrmUnitOfWork);
//# sourceMappingURL=type-orm-unit-of-works1.js.map