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
var MarcaPersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarcaPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const create_marca_dto_1 = require("../../dto/create-marca.dto");
const marca_entity_1 = require("../../domain/entities/marca.entity");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const entity_notFound_exceptions_1 = require("../../../../common/exceptions/entity-notFound-exceptions");
const transactional_decoratos_1 = require("../../../../common/decorators/transactional.decoratos");
const usuario_entity_1 = require("../../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const fecha_utils_1 = require("../../../../common/utils/date/fecha-utils");
const base_persistence_adapter_1 = require("../../../../common/persistence/base-persistence.adapter");
const query_builder_helpers_1 = require("../../../../common/query-builders/query-builder-helpers");
const database_error_helper_1 = require("../../../../common/query-builders/database-error.helper");
let MarcaPersistenceAdapter = MarcaPersistenceAdapter_1 = class MarcaPersistenceAdapter extends base_persistence_adapter_1.BasePersistenceAdapter {
    constructor(repository, dataSource, uow) {
        super(repository);
        this.dataSource = dataSource;
        this.uow = uow;
        this.logger = new common_1.Logger(MarcaPersistenceAdapter_1.name);
        this.ALIAS = 'marca';
    }
    async create(data) {
        const repo = this.uow.getRepository(marca_entity_1.Marca);
        const nueva = repo.create(data);
        return await repo.save(nueva);
    }
    async findAllFor(denominacion) {
        try {
            const query = this.baseQuery().andWhere(`UPPER(${this.ALIAS}.denominacion) LIKE :denominacion`, {
                denominacion: `%${denominacion.toUpperCase()}%`,
            });
            query_builder_helpers_1.QueryBuilderHelper.applyOrder(query, this.ALIAS, 'denominacion', 'ASC');
            return await query.getMany();
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findAllFor', error);
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
    async findAllSinSistemaFor(denominacion) {
        try {
            const query = this.repository
                .createQueryBuilder('marca')
                .where('marca.deletedAt IS NULL')
                .andWhere('marca.sistema = :sistema', { sistema: 0 });
            query.andWhere('UPPER(marca.denominacion) LIKE :denominacion', {
                denominacion: `%${denominacion.toUpperCase()}%`,
            });
            return await query.orderBy('marca.denominacion', 'ASC').getMany();
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findAllSistemaFor(denominacion) {
        try {
            const query = this.repository
                .createQueryBuilder('marca')
                .where('marca.deletedAt IS NULL')
                .andWhere('marca.sistema = :sistema', { sistema: 1 });
            query.andWhere('UPPER(marca.denominacion) LIKE :denominacion', {
                denominacion: `%${denominacion.toUpperCase()}%`,
            });
            return await query.orderBy('marca.denominacion', 'ASC').getMany();
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
            this.logger.warn(`FindOne : ${JSON.stringify(entity)}.`);
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
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findBy(denominacion, skip = 0, take = 10, incluirEliminados = false) {
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
    async findByIdConAuditoria(id) {
        try {
            const raw = await this.repository
                .createQueryBuilder('marca')
                .leftJoin('usuario', 'usuarioCreated', 'usuarioCreated.id = marca.usuarioCreatedId')
                .leftJoin('usuario', 'usuarioUpdated', 'usuarioUpdated.id = marca.usuarioUpdatedId')
                .leftJoin('usuario', 'usuarioDeleted', 'usuarioDeleted.id = marca.usuarioDeletedId')
                .addSelect([
                'marca.id as marca_id',
                'marca.denominacion as marca_denominacion',
                'marca.createdAt as marca_createdAt',
                'marca.updatedAt as marca_updatedAt',
                'marca.deletedAt as marca_deletedAt',
                'usuarioCreated.denominacion as usuarioCreated_nombre',
                'usuarioUpdated.denominacion as usuarioUpdated_nombre',
                'usuarioDeleted.denominacion as usuarioDeleted_nombre',
            ])
                .where('marca.id = :id', { id })
                .getRawOne();
            console.debug('RAW RESULTADO:', raw);
            if (!raw)
                return null;
            return {
                id: raw.marca_id ?? 0,
                detalle: raw.marca_denominacion
                    ? `Marca ${raw.marca_denominacion}`
                    : 'Marca (sin denominación)',
                createdAt: raw.marca_createdAt
                    ? fecha_utils_1.FechaUtils.formatFechaHora(raw.marca_createdAt)
                    : '',
                updatedAt: raw.marca_updatedAt
                    ? fecha_utils_1.FechaUtils.formatFechaHora(raw.marca_updatedAt)
                    : '',
                deletedAt: raw.marca_deletedAt
                    ? fecha_utils_1.FechaUtils.formatFechaHora(raw.marca_deletedAt)
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
    async update(id, data) {
        const repo = this.uow.getRepository(marca_entity_1.Marca);
        const existente = await repo.findOneBy({ id });
        if (!existente)
            throw new Error('Marca no encontrada');
        repo.merge(existente, data);
        return await repo.save(existente);
    }
    async remove(entity, usuario) {
        const repo = this.uow.getRepository(marca_entity_1.Marca);
        if (entity.deletedAt) {
            throw new common_1.NotFoundException('Entidad ya eliminada.');
        }
        entity.deletedAt = new Date();
        entity.usuarioDeletedId = usuario.id;
        await repo.save(entity);
        return entity;
    }
    async findByDenominacionWith(denominacion) {
        try {
            const normalizada = denominacion.trim().toUpperCase();
            const entity = await this.repository
                .createQueryBuilder('marca')
                .withDeleted()
                .where('UPPER(marca.denominacion) = :denominacion', {
                denominacion: normalizada,
            })
                .getOne();
            if (!entity) {
                this.logger.log(`⚪ No encontrada marca (ni activa ni eliminada): ${normalizada}`);
                return null;
            }
            this.logger.log(`✅ Encontrada marca (puede estar activa o eliminada): ID=${entity.id}, denominación=${entity.denominacion}`);
            return entity;
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findByDenominacionWith', error);
        }
    }
};
exports.MarcaPersistenceAdapter = MarcaPersistenceAdapter;
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_marca_dto_1.CreateMarcaDto]),
    __metadata("design:returntype", Promise)
], MarcaPersistenceAdapter.prototype, "create", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MarcaPersistenceAdapter.prototype, "update", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [marca_entity_1.Marca, usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], MarcaPersistenceAdapter.prototype, "remove", null);
exports.MarcaPersistenceAdapter = MarcaPersistenceAdapter = MarcaPersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(marca_entity_1.Marca)),
    __param(2, (0, common_1.Inject)('UnitOfWork')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource, Object])
], MarcaPersistenceAdapter);
//# sourceMappingURL=marca.persistence-adapters.js.map