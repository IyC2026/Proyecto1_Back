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
var CondicionIvaPersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CondicionIvaPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const create_condicion_iva_dto_1 = require("../../dto/create-condicion-iva.dto");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const entity_notFound_exceptions_1 = require("../../../../common/exceptions/entity-notFound-exceptions");
const transactional_decoratos_1 = require("../../../../common/decorators/transactional.decoratos");
const fecha_utils_1 = require("../../../../common/utils/date/fecha-utils");
const condicion_iva_entity_1 = require("../../domain/entities/condicion-iva.entity");
let CondicionIvaPersistenceAdapter = CondicionIvaPersistenceAdapter_1 = class CondicionIvaPersistenceAdapter {
    constructor(repository, dataSource, uow) {
        this.repository = repository;
        this.dataSource = dataSource;
        this.uow = uow;
        this.logger = new common_1.Logger(CondicionIvaPersistenceAdapter_1.name);
        this.ENTITY_NAME = 'CondicionIva';
    }
    async create(data) {
        const repo = this.uow.getRepository(condicion_iva_entity_1.CondicionIva);
        const nueva = repo.create(data);
        return await repo.save(nueva);
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
    async findAllListado() {
        try {
            const query = this.repository
                .createQueryBuilder('condicionIva')
                .where('condicionIva.deletedAt IS NULL');
            return await query.orderBy('condicionIva.denominacion', 'ASC').getMany();
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
    async findByDenominacionFiltered(denominacion, skip = 0, take = 10) {
        try {
            const query = this.repository
                .createQueryBuilder('condicionIva')
                .where('condicionIva.deletedAt IS NULL');
            if (denominacion) {
                query.andWhere('UPPER(condicionIva.denominacion) LIKE :denominacion', {
                    denominacion: `%${denominacion.toUpperCase()}%`,
                });
            }
            const [data, total] = await query
                .orderBy('condicionIva.denominacion', 'ASC')
                .skip(skip)
                .take(take)
                .getManyAndCount();
            return { data, total };
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findAllFor() {
        try {
            return await this.repository.find({
                where: { deletedAt: (0, typeorm_1.IsNull)() },
                order: { denominacion: 'ASC' },
            });
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async update(id, data) {
        const repo = this.uow.getRepository(condicion_iva_entity_1.CondicionIva);
        const existente = await repo.findOneBy({ id });
        if (!existente)
            throw new Error('Marca no encontrada');
        repo.merge(existente, data);
        return await repo.save(existente);
    }
    async remove(entity) {
        const repo = this.uow.getRepository(condicion_iva_entity_1.CondicionIva);
        entity.deletedAt = new Date();
        await repo.save(entity);
        return entity;
    }
    async findByIdConAuditoria(id) {
        try {
            const raw = await this.repository
                .createQueryBuilder('condicion')
                .leftJoin('usuario', 'usuarioCreated', 'usuarioCreated.id = condicion.usuarioCreatedId')
                .leftJoin('usuario', 'usuarioUpdated', 'usuarioUpdated.id = condicion.usuarioUpdatedId')
                .leftJoin('usuario', 'usuarioDeleted', 'usuarioDeleted.id = condicion.usuarioDeletedId')
                .addSelect([
                'condicion.id as condicion_id',
                'condicion.denominacion as condicion_denominacion',
                'condicion.createdAt as condicion_createdAt',
                'condicion.updatedAt as condicion_updatedAt',
                'condicion.deletedAt as condicion_deletedAt',
                'usuarioCreated.denominacion as usuarioCreated_nombre',
                'usuarioUpdated.denominacion as usuarioUpdated_nombre',
                'usuarioDeleted.denominacion as usuarioDeleted_nombre',
            ])
                .where('condicion.id = :id', { id })
                .getRawOne();
            console.debug('RAW RESULTADO:', raw);
            if (!raw)
                return null;
            return {
                id: raw.condicion_id ?? 0,
                detalle: raw.condicion_denominacion
                    ? `condicion ${raw.condicion_denominacion}`
                    : 'condicion (sin denominación)',
                createdAt: raw.condicion_createdAt
                    ? fecha_utils_1.FechaUtils.formatFechaHora(raw.condicion_createdAt)
                    : '',
                updatedAt: raw.condicion_updatedAt
                    ? fecha_utils_1.FechaUtils.formatFechaHora(raw.condicion_updatedAt)
                    : '',
                deletedAt: raw.condicion_deletedAt
                    ? fecha_utils_1.FechaUtils.formatFechaHora(raw.condicion_deletedAt)
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
exports.CondicionIvaPersistenceAdapter = CondicionIvaPersistenceAdapter;
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_condicion_iva_dto_1.CreateCondicionIvaDto]),
    __metadata("design:returntype", Promise)
], CondicionIvaPersistenceAdapter.prototype, "create", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CondicionIvaPersistenceAdapter.prototype, "update", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [condicion_iva_entity_1.CondicionIva]),
    __metadata("design:returntype", Promise)
], CondicionIvaPersistenceAdapter.prototype, "remove", null);
exports.CondicionIvaPersistenceAdapter = CondicionIvaPersistenceAdapter = CondicionIvaPersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(condicion_iva_entity_1.CondicionIva)),
    __param(2, (0, common_1.Inject)('UnitOfWork')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource, Object])
], CondicionIvaPersistenceAdapter);
//# sourceMappingURL=condicion-iva.persistence-adapters.js.map