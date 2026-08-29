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
var EmpresaPersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const entity_notFound_exceptions_1 = require("../../../../common/exceptions/entity-notFound-exceptions");
const empresa_entity_1 = require("../../domain/entities/empresa.entity");
let EmpresaPersistenceAdapter = EmpresaPersistenceAdapter_1 = class EmpresaPersistenceAdapter {
    constructor(repository, dataSource) {
        this.repository = repository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(EmpresaPersistenceAdapter_1.name);
        this.ENTITY_NAME = 'Empresa';
    }
    async create(data, condicionIva) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${condicionIva.denominacion}`);
            const nuevaEntity = queryRunner.manager.create(empresa_entity_1.Empresa, {
                ...data,
                condicionIva,
            });
            const entityGuardada = await queryRunner.manager.save(nuevaEntity);
            await queryRunner.commitTransaction();
            return entityGuardada;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Error2 al conectar con la base de datos: ${error.code}++ ${error.message}`);
            if (error.code === '42P01' ||
                error.code === 'ER_NO_SUCH_TABLE' ||
                error.message.includes('no such table') ||
                error.number === 208) {
                throw new Error('Error: La tabla de la entidad no existe en la base de datos.');
            }
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll(skip = 0, take = 10) {
        try {
            return await this.repository.find({
                where: { deletedAt: (0, typeorm_1.IsNull)() },
                skip,
                take,
                order: { denominacion: 'ASC' },
            });
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findOne(id) {
        try {
            const entity = await this.repository.findOne({
                where: { id, deletedAt: (0, typeorm_1.IsNull)() },
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
    async findOneWithRelations(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('empresa')
                .leftJoinAndSelect('empresa.condicionIva', 'condicionIva')
                .where('empresa.id = :id', { id })
                .andWhere('empresa.deletedAt IS NULL')
                .getOne();
            this.logger.warn(`Resultado Empresa: ${JSON.stringify(entity)}`);
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
            const entity = await this.repository.findOne({
                where: { denominacion, deletedAt: (0, typeorm_1.IsNull)() },
            });
            return entity;
        }
        catch (error) {
            if (error.code === '42P01' ||
                error.code === 'ER_NO_SUCH_TABLE' ||
                error.message.includes('no such table') ||
                error.number === 208) {
                throw new Error('Error:4 La tabla de la entidad no existe en la base de datos.');
            }
            this.logger.error(`Error2 al conectar con la base de datos: ${error.code}`);
            throw new database_connection_exception_1.DatabaseConnectionException(`Error al conectar con la base de datos.1 ${error.code} `);
        }
    }
    async findByDenominacionFiltered(denominacion, skip = 0, take = 10) {
        try {
            return await this.repository.find({
                where: {
                    denominacion: (0, typeorm_1.ILike)(`%${denominacion}%`),
                    deletedAt: (0, typeorm_1.IsNull)(),
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
    async update(id, data, condicionIva) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const entity = await queryRunner.manager.findOne(empresa_entity_1.Empresa, {
                where: { id },
                relations: ['condicionIva'],
            });
            if (!entity) {
                throw new common_1.NotFoundException(`EL prodcuto con ID ${id} no encontrada`);
            }
            Object.assign(entity, data, { condicionIva });
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
    async empresaExist(empresaId) {
        const exists = await this.repository.exists({
            where: { id: empresaId },
        });
        if (!exists) {
            const existsDeleted = await this.repository.exist({
                where: { id: empresaId },
                withDeleted: true,
            });
            if (existsDeleted) {
                throw new common_1.BadRequestException(`La empresa con ID ${empresaId} está inactiva`);
            }
            else {
                throw new common_1.NotFoundException(`Empresa con ID ${empresaId} no existe`);
            }
        }
        return exists;
    }
};
exports.EmpresaPersistenceAdapter = EmpresaPersistenceAdapter;
exports.EmpresaPersistenceAdapter = EmpresaPersistenceAdapter = EmpresaPersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(empresa_entity_1.Empresa)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], EmpresaPersistenceAdapter);
//# sourceMappingURL=empresa.persistence-adapters.js.map