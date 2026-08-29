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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RolPersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const entity_notFound_exceptions_1 = require("../../../../common/exceptions/entity-notFound-exceptions");
const typeorm_2 = require("typeorm");
const rol_entity_1 = require("../../domain/entities/rol.entity");
let RolPersistenceAdapter = RolPersistenceAdapter_1 = class RolPersistenceAdapter {
    constructor(repository, dataSource) {
        this.repository = repository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(RolPersistenceAdapter_1.name);
        this.ENTITY_NAME = 'Rol';
    }
    async create(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const nuevaEntity = queryRunner.manager.create(rol_entity_1.Rol, data);
            const entityGuardada = await queryRunner.manager.save(nuevaEntity);
            await queryRunner.commitTransaction();
            return entityGuardada;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`${this.ENTITY_NAME}Error en transacción : ${error.message}`);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll(skip = 0, take = 10) {
        try {
            return await this.repository.find({
                where: { deletedAt: (0, typeorm_2.IsNull)() },
                skip,
                take,
                order: { denominacion: 'DESC' },
            });
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findOne(id) {
        try {
            const entity = await this.repository.findOne({
                where: { id, deletedAt: (0, typeorm_2.IsNull)() },
            });
            this.logger.warn(`: ${entity}.`);
            if (!entity) {
                throw new entity_notFound_exceptions_1.EntityNotFoundException('Entidad no encontrada');
            }
            return entity;
        }
        catch (error) {
            if (error instanceof entity_notFound_exceptions_1.EntityNotFoundException) {
                throw error;
            }
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findByDenominacion(denominacion) {
        try {
            const entity = await this.repository.findOne({ where: { denominacion, deletedAt: (0, typeorm_2.IsNull)() } });
            return entity;
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findByDenominacionFiltered(denominacion, skip = 0, take = 10) {
        try {
            return await this.repository.find({
                where: {
                    denominacion: (0, typeorm_2.ILike)(`%${denominacion}%`),
                    deletedAt: (0, typeorm_2.IsNull)()
                },
                skip,
                take,
                order: { denominacion: 'ASC' },
            });
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async update(id, data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const entity = await queryRunner.manager.findOne(rol_entity_1.Rol, {
                where: { id }
            });
            if (!entity) {
                throw new common_1.NotFoundException(`${this.ENTITY_NAME}  con ID ${id} no encontrada`);
            }
            Object.assign(entity, data);
            const entityActualizada = await queryRunner.manager.save(entity);
            await queryRunner.commitTransaction();
            return entityActualizada;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        const entity = await this.findOne(id);
        if (!entity) {
            throw new Error(`${this.ENTITY_NAME}  con ID ${id} no encontrada`);
        }
        if (entity.deletedAt) {
            throw new common_1.NotFoundException('Entidad ya eliminada.');
        }
        try {
            entity.deletedAt = new Date();
            return await this.repository.save(entity);
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
    }
    async findByIds(ids) {
        return this.repository.findBy({ id: (0, typeorm_2.In)(ids) });
    }
};
exports.RolPersistenceAdapter = RolPersistenceAdapter;
exports.RolPersistenceAdapter = RolPersistenceAdapter = RolPersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rol_entity_1.Rol)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], RolPersistenceAdapter);
//# sourceMappingURL=rol-persistence-adapters.js.map