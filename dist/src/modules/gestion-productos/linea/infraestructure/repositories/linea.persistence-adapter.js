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
var LineaPersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineaPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const entity_notFound_exceptions_1 = require("../../../../common/exceptions/entity-notFound-exceptions");
const typeorm_2 = require("typeorm");
const create_linea_dto_1 = require("../../dto/create-linea.dto");
const linea_entity_1 = require("../../domain/entities/linea.entity");
const update_linea_dto_1 = require("../../dto/update-linea.dto");
const transactional_decoratos_1 = require("../../../../common/decorators/transactional.decoratos");
const usuario_entity_1 = require("../../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const fecha_utils_1 = require("../../../../common/utils/date/fecha-utils");
const query_builder_helpers_1 = require("../../../../common/query-builders/query-builder-helpers");
const base_persistence_adapter_1 = require("../../../../common/persistence/base-persistence.adapter");
const database_error_helper_1 = require("../../../../common/query-builders/database-error.helper");
let LineaPersistenceAdapter = LineaPersistenceAdapter_1 = class LineaPersistenceAdapter extends base_persistence_adapter_1.BasePersistenceAdapter {
    constructor(repository, dataSource, uow) {
        super(repository);
        this.dataSource = dataSource;
        this.uow = uow;
        this.logger = new common_1.Logger(LineaPersistenceAdapter_1.name);
        this.ALIAS = 'linea';
    }
    async create(data) {
        const repo = this.uow.getRepository(linea_entity_1.Linea);
        try {
            const nuevaEntity = repo.create({
                denominacion: data.denominacion,
                utilizaStockMinimo: data.utilizaStockMinimo,
                stockMinimo: data.stockMinimo,
                usuarioCreatedId: data.usuarioCreatedId,
                observacion: data.observacion,
            });
            const entityGuardada = await repo.save(nuevaEntity);
            return entityGuardada;
        }
        catch (error) {
            this.logger.error(`Error al conectar con la base de datos: ${error}`);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
    }
    async update(id, data) {
        const repo = this.uow.getRepository(linea_entity_1.Linea);
        const entity = await repo.findOne({
            where: { id }
        });
        if (!entity) {
            throw new common_1.NotFoundException(`Línea con ID ${id} no encontrada`);
        }
        entity.denominacion = data.denominacion ?? entity.denominacion;
        entity.utilizaStockMinimo = data.utilizaStockMinimo;
        entity.stockMinimo = data.stockMinimo ?? 0;
        entity.usuarioCreatedId = data.usuarioCreatedId;
        const entityActualizada = await repo.save(entity);
        return entityActualizada;
    }
    async findOne(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('linea')
                .where('linea.id = :id', { id })
                .andWhere('linea.deletedAt IS NULL')
                .getOne();
            this.logger.warn(`Entidad obtenida: ${JSON.stringify(entity)}`);
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
    async findAllListado() {
        try {
            const query = this.baseQuery();
            query_builder_helpers_1.QueryBuilderHelper.applyOrder(query, this.ALIAS, 'denominacion', 'ASC');
            return await query.getMany();
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findAllListado', error);
        }
    }
    async findByDenominacion(denominacion) {
        try {
            const entity = await this.repository
                .createQueryBuilder('linea')
                .where('linea.denominacion = :denominacion', { denominacion })
                .andWhere('linea.deletedAt IS NULL')
                .getOne();
            return entity;
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findByDenominacionWith(denominacion) {
        this.logger.log(`🔎 Buscando denominación (incluyendo borradas): ${denominacion}`);
        try {
            const normalizada = denominacion.trim().toUpperCase();
            const entity = await this.repository
                .createQueryBuilder('linea')
                .withDeleted()
                .where('UPPER(linea.denominacion) = :denominacion', {
                denominacion: normalizada,
            })
                .getOne();
            if (!entity) {
                this.logger.log(` No encontrada línea (ni activa ni eliminada): ${normalizada}`);
                return null;
            }
            this.logger.log(`✅ Encontrada línea (puede estar activa o eliminada): ID=${entity.id}, denominación=${entity.denominacion}`);
            return entity;
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findByDenominacionWith', error);
        }
    }
    async findByDenominacionFiltered(denominacion, skip = 0, take = 10, incluirEliminados = false) {
        try {
            const query = this.baseQuery(incluirEliminados);
            if (denominacion) {
                query.andWhere(`UPPER(${this.ALIAS}.denominacion) LIKE :denominacion`, {
                    denominacion: `%${denominacion.toUpperCase()}%`,
                });
            }
            query_builder_helpers_1.QueryBuilderHelper.applyOrder(query, this.ALIAS, 'denominacion', 'ASC');
            query_builder_helpers_1.QueryBuilderHelper.applyPagination(query, skip, take);
            const [data, total] = await query.getManyAndCount();
            return { data, total };
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findBy', error);
        }
    }
    async findAllFor(denominacion) {
        try {
            const query = this.baseQuery();
            query.andWhere('UPPER(linea.denominacion) LIKE :denominacion', {
                denominacion: `%${denominacion.toUpperCase()}%`,
            });
            query_builder_helpers_1.QueryBuilderHelper.applyOrder(query, this.ALIAS, 'denominacion', 'ASC');
            return await query.getMany();
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findAllFor', error);
        }
    }
    async findAllSinSistemaFor(denominacion) {
        try {
            const query = this.repository
                .createQueryBuilder('linea')
                .where('linea.deletedAt IS NULL')
                .andWhere('linea.sistema = :sistema', { sistema: 0 });
            if (denominacion && denominacion.trim() !== '') {
                query.andWhere('UPPER(linea.denominacion) LIKE :denominacion', {
                    denominacion: `%${denominacion.toUpperCase()}%`,
                });
            }
            return await query.orderBy('linea.denominacion', 'ASC').getMany();
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async remove(entity, usuario) {
        const repo = this.uow.getRepository(linea_entity_1.Linea);
        entity.deletedAt = new Date();
        entity.usuarioDeletedId = usuario.id;
        await repo.save(entity);
        return entity;
    }
    async findByIdConAuditoria(id) {
        try {
            const raw = await this.repository
                .createQueryBuilder('linea')
                .leftJoin('usuario', 'usuarioCreated', 'usuarioCreated.id = linea.usuarioCreatedId')
                .leftJoin('usuario', 'usuarioUpdated', 'usuarioUpdated.id = linea.usuarioUpdatedId')
                .leftJoin('usuario', 'usuarioDeleted', 'usuarioDeleted.id = linea.usuarioDeletedId')
                .addSelect([
                'linea.id as linea_id',
                'linea.denominacion as linea_denominacion',
                'linea.createdAt as linea_createdAt',
                'linea.updatedAt as linea_updatedAt',
                'linea.deletedAt as linea_deletedAt',
                'usuarioCreated.denominacion as usuarioCreated_nombre',
                'usuarioUpdated.denominacion as usuarioUpdated_nombre',
                'usuarioDeleted.denominacion as usuarioDeleted_nombre',
            ])
                .where('linea.id = :id', { id })
                .getRawOne();
            console.debug('RAW RESULTADO:', raw);
            if (!raw)
                return null;
            return {
                id: raw.linea_id ?? 0,
                detalle: raw.linea_denominacion
                    ? `linea ${raw.linea_denominacion}`
                    : 'linea (sin denominación)',
                createdAt: raw.linea_createdAt
                    ? fecha_utils_1.FechaUtils.formatFechaHora(raw.linea_createdAt)
                    : '',
                updatedAt: raw.linea_updatedAt
                    ? fecha_utils_1.FechaUtils.formatFechaHora(raw.linea_updatedAt)
                    : '',
                deletedAt: raw.linea_deletedAt
                    ? fecha_utils_1.FechaUtils.formatFechaHora(raw.linea_deletedAt)
                    : '',
                usuarioCreated: raw.usuarioCreated_nombre ?? '',
                usuarioUpdated: raw.usuarioUpdated_nombre ?? '',
                usuarioDeleted: raw.usuarioDeleted_nombre ?? '',
            };
        }
        catch (error) {
            console.error('ERROR EN findByIdConAuditoria:', error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
};
exports.LineaPersistenceAdapter = LineaPersistenceAdapter;
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_linea_dto_1.CreateLineaDto]),
    __metadata("design:returntype", Promise)
], LineaPersistenceAdapter.prototype, "create", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_linea_dto_1.UpdateLineaDto]),
    __metadata("design:returntype", Promise)
], LineaPersistenceAdapter.prototype, "update", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [linea_entity_1.Linea, usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], LineaPersistenceAdapter.prototype, "remove", null);
exports.LineaPersistenceAdapter = LineaPersistenceAdapter = LineaPersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(linea_entity_1.Linea)),
    __param(2, (0, common_1.Inject)('UnitOfWork')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource, Object])
], LineaPersistenceAdapter);
//# sourceMappingURL=linea.persistence-adapter.js.map