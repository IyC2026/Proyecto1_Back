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
var LocalidadPersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalidadPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const entity_notFound_exceptions_1 = require("../../../../common/exceptions/entity-notFound-exceptions");
const typeorm_2 = require("typeorm");
const create_localidad_dto_1 = require("../../dto/create-localidad.dto");
const localidad_entity_1 = require("../../domain/entities/localidad.entity");
const update_localidad_dto_1 = require("../../dto/update-localidad.dto");
const transactional_decoratos_1 = require("../../../../common/decorators/transactional.decoratos");
const fecha_utils_1 = require("../../../../common/utils/date/fecha-utils");
const provincia_entity_1 = require("../../../provincia/domain/entities/provincia.entity");
const base_persistence_adapter_1 = require("../../../../common/persistence/base-persistence.adapter");
const query_builder_helpers_1 = require("../../../../common/query-builders/query-builder-helpers");
const database_error_helper_1 = require("../../../../common/query-builders/database-error.helper");
let LocalidadPersistenceAdapter = LocalidadPersistenceAdapter_1 = class LocalidadPersistenceAdapter extends base_persistence_adapter_1.BasePersistenceAdapter {
    constructor(repository, dataSource, uow) {
        super(repository);
        this.dataSource = dataSource;
        this.uow = uow;
        this.logger = new common_1.Logger(LocalidadPersistenceAdapter_1.name);
        this.ENTITY_NAME = 'Localidad';
        this.ALIAS = 'localidad';
    }
    async create(data, provincia) {
        const repo = this.uow.getRepository(localidad_entity_1.Localidad);
        try {
            const nueva = repo.create({
                ...data,
                provincia,
            });
            const nuevaGuardada = await repo.save(nueva);
            return nuevaGuardada;
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'create', error);
        }
    }
    async findAllFor() {
        try {
            const query = this.baseQuery()
                .leftJoinAndSelect(`${this.ALIAS}.provincia`, 'provincia');
            query_builder_helpers_1.QueryBuilderHelper.applyOrder(query, this.ALIAS, 'denominacion', 'ASC');
            return await query.getMany();
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findAllFor', error);
        }
    }
    async findAllListado() {
        try {
            const query = this.baseQuery(false);
            query_builder_helpers_1.QueryBuilderHelper.applyOrder(query, this.ALIAS, 'denominacion', 'ASC');
            return await query.getMany();
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findAllListado', error);
        }
    }
    async findAllForProvincia(provinciaId) {
        try {
            return await this.repository.find({
                where: {
                    deletedAt: (0, typeorm_2.IsNull)(),
                    provincia: { id: provinciaId },
                },
                relations: ['provincia'],
                order: { denominacion: 'ASC' },
            });
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findAllForProvincia', error);
        }
    }
    async findOne(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('localidad')
                .leftJoinAndSelect('localidad.provincia', 'provincia')
                .where('localidad.id = :id', { id })
                .andWhere('localidad.deletedAt IS NULL')
                .getOne();
            this.logger.warn(`: ${entity}.`);
            if (!entity) {
                throw new entity_notFound_exceptions_1.EntityNotFoundException('Entidad no encontrada.');
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
                where: { denominacion, deletedAt: (0, typeorm_2.IsNull)() },
            });
            return entity;
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findBy(denominacion, provinciaId, skip = 0, take = 10, incluirEliminados = false) {
        try {
            const query = this.baseQuery(incluirEliminados);
            query.leftJoinAndSelect('localidad.provincia', 'provincia');
            if (denominacion) {
                query.andWhere('UPPER(localidad.denominacion) LIKE :denominacion', {
                    denominacion: `%${denominacion.toUpperCase()}%`,
                });
            }
            if (provinciaId && provinciaId > 0) {
                query.andWhere('localidad.provincia_id = :provinciaId', {
                    provinciaId,
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
    async update(id, data, provincia) {
        const localidadRepo = this.uow.getRepository(localidad_entity_1.Localidad);
        this.logger.debug(`Datos recibidos para actualizar localidad: id=${id}, data=${JSON.stringify(data)}, provinciaId=${provincia.id}`);
        try {
            const entity = await this.findOne(id);
            if (!entity) {
                throw new common_1.NotFoundException(`Localidad con ID ${id} no encontrada`);
            }
            entity.denominacion = data.denominacion ?? entity.denominacion;
            entity.observacion = data.observacion ?? entity.observacion;
            entity.updatedAt = new Date();
            entity.provincia = provincia;
            const entityActualizada = await localidadRepo.save(entity);
            return entityActualizada;
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'update', error);
        }
    }
    async remove(id) {
        const entity = await this.findOne(id);
        if (!entity) {
            throw new Error(`${this.ENTITY_NAME}  con ID ${id} no encontrada`);
        }
        if (!entity || entity.deletedAt) {
            throw new common_1.NotFoundException('Entidad no encontrada o ya eliminada.');
        }
        try {
            await this.repository.update(id, { deletedAt: new Date() });
            return entity;
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
    }
    async findByIdConAuditoria(id) {
        try {
            const raw = await this.repository
                .createQueryBuilder('localidad')
                .leftJoin('usuario', 'usuarioCreated', 'usuarioCreated.id = localidad.usuarioCreatedId')
                .leftJoin('usuario', 'usuarioUpdated', 'usuarioUpdated.id = localidad.usuarioUpdatedId')
                .leftJoin('usuario', 'usuarioDeleted', 'usuarioDeleted.id = localidad.usuarioDeletedId')
                .addSelect([
                'localidad.id as localidad_id',
                'localidad.denominacion as localidad_denominacion',
                'localidad.createdAt as localidad_createdAt',
                'localidad.updatedAt as localidad_updatedAt',
                'localidad.deletedAt as localidad_deletedAt',
                'usuarioCreated.denominacion as usuarioCreated_nombre',
                'usuarioUpdated.denominacion as usuarioUpdated_nombre',
                'usuarioDeleted.denominacion as usuarioDeleted_nombre',
            ])
                .where('localidad.id = :id', { id })
                .getRawOne();
            console.debug('RAW RESULTADO:', raw);
            if (!raw)
                return null;
            return {
                id: raw.localidad_id ?? 0,
                detalle: raw.localidad_denominacion
                    ? `localidad ${raw.localidad_denominacion}`
                    : 'localidad (sin denominación)',
                createdAt: raw.localidad_createdAt
                    ? fecha_utils_1.FechaUtils.formatFechaHora(raw.localidad_createdAt)
                    : '',
                updatedAt: raw.localidad_updatedAt
                    ? fecha_utils_1.FechaUtils.formatFechaHora(raw.localidad_updatedAt)
                    : '',
                deletedAt: raw.localidad_deletedAt
                    ? fecha_utils_1.FechaUtils.formatFechaHora(raw.localidad_deletedAt)
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
exports.LocalidadPersistenceAdapter = LocalidadPersistenceAdapter;
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_localidad_dto_1.CreateLocalidadDto,
        provincia_entity_1.Provincia]),
    __metadata("design:returntype", Promise)
], LocalidadPersistenceAdapter.prototype, "create", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_localidad_dto_1.UpdateLocalidadDto,
        provincia_entity_1.Provincia]),
    __metadata("design:returntype", Promise)
], LocalidadPersistenceAdapter.prototype, "update", null);
exports.LocalidadPersistenceAdapter = LocalidadPersistenceAdapter = LocalidadPersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(localidad_entity_1.Localidad)),
    __param(2, (0, common_1.Inject)('UnitOfWork')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource, Object])
], LocalidadPersistenceAdapter);
//# sourceMappingURL=localidad.persistence-adapters.js.map