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
var AlicuotaIvaPersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicuotaIvaPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transactional_decoratos_1 = require("../../../../common/decorators/transactional.decoratos");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const entity_notFound_exceptions_1 = require("../../../../common/exceptions/entity-notFound-exceptions");
const base_persistence_adapter_1 = require("../../../../common/persistence/base-persistence.adapter");
const usuario_entity_1 = require("../../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const auditoria_query_helper_1 = require("../../../../common/persistence/auditoria-query.helper");
const typeorm_2 = require("typeorm");
const alicuota_iva_entity_1 = require("../../domain/entities/alicuota-iva.entity");
const create_alicuota_iva_dto_1 = require("../../dto/create-alicuota-iva.dto");
let AlicuotaIvaPersistenceAdapter = AlicuotaIvaPersistenceAdapter_1 = class AlicuotaIvaPersistenceAdapter extends base_persistence_adapter_1.BasePersistenceAdapter {
    constructor(repository, dataSource, uow) {
        super(repository);
        this.dataSource = dataSource;
        this.uow = uow;
        this.ALIAS = 'alicuotaIva';
        this.logger = new common_1.Logger(AlicuotaIvaPersistenceAdapter_1.name);
    }
    async create(data) {
        const repo = this.uow.getRepository(alicuota_iva_entity_1.AlicuotaIva);
        const entity = repo.create(data);
        return repo.save(entity);
    }
    async update(id, data) {
        const repo = this.uow.getRepository(alicuota_iva_entity_1.AlicuotaIva);
        const existente = await repo.findOneBy({ id });
        if (!existente) {
            throw new entity_notFound_exceptions_1.EntityNotFoundException('AlicuotaIva no encontrada');
        }
        repo.merge(existente, data);
        return repo.save(existente);
    }
    async remove(entity, usuario) {
        if (entity.deletedAt) {
            throw new common_1.NotFoundException('Entidad ya eliminada.');
        }
        const repo = this.uow.getRepository(alicuota_iva_entity_1.AlicuotaIva);
        entity.deletedAt = new Date();
        entity.usuarioDeletedId = usuario.id;
        await repo.save(entity);
        return entity;
    }
    async findAllFor(denominacion) {
        try {
            return await this.baseQuery()
                .andWhere(`UPPER(${this.ALIAS}.denominacion) LIKE :denominacion`, {
                denominacion: `%${denominacion.toUpperCase()}%`,
            })
                .orderBy(`${this.ALIAS}.denominacion`, 'ASC')
                .getMany();
        }
        catch {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findAllSistemaFor(denominacion) {
        try {
            return await this.baseQuery()
                .andWhere(`${this.ALIAS}.sistema = :sistema`, { sistema: 1 })
                .andWhere(`UPPER(${this.ALIAS}.denominacion) LIKE :denominacion`, {
                denominacion: `%${denominacion.toUpperCase()}%`,
            })
                .orderBy(`${this.ALIAS}.denominacion`, 'ASC')
                .getMany();
        }
        catch {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findByDenominacion(denominacion) {
        try {
            return await this.repository.findOne({
                where: {
                    denominacion,
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
        }
        catch {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findByIdConAuditoria(id) {
        try {
            let qb = this.repository.createQueryBuilder(this.ALIAS);
            qb = auditoria_query_helper_1.AuditoriaQueryHelper.applyJoins(qb, this.ALIAS);
            qb = auditoria_query_helper_1.AuditoriaQueryHelper.applySelect(qb, this.ALIAS);
            const raw = await qb.where(`${this.ALIAS}.id = :id`, { id }).getRawOne();
            if (!raw)
                return null;
            return auditoria_query_helper_1.AuditoriaQueryHelper.mapToDto(raw, this.ALIAS, 'Tipo de Movimiento Bancario');
        }
        catch (error) {
            this.logger.error('ERROR EN findByIdConAuditoria', error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findAllSinSistemaFor(denominacion) {
        try {
            return await this.baseQuery()
                .andWhere(`${this.ALIAS}.sistema = :sistema`, { sistema: 0 })
                .andWhere(`UPPER(${this.ALIAS}.denominacion) LIKE :denominacion`, {
                denominacion: `%${denominacion.toUpperCase()}%`,
            })
                .orderBy(`${this.ALIAS}.denominacion`, 'ASC')
                .getMany();
        }
        catch {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findOne(id) {
        const entity = await this.repository.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
        });
        if (!entity) {
            throw new entity_notFound_exceptions_1.EntityNotFoundException('Entidad no encontrada');
        }
        return entity;
    }
    async findBy(denominacion, skip = 0, take = 10) {
        try {
            const [data, total] = await this.baseQuery()
                .andWhere(`UPPER(${this.ALIAS}.denominacion) LIKE :denominacion`, {
                denominacion: `%${denominacion.toUpperCase()}%`,
            })
                .orderBy(`${this.ALIAS}.denominacion`, 'ASC')
                .skip(skip)
                .take(take)
                .getManyAndCount();
            return { data, total };
        }
        catch {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findByDenominacionWith(denominacion) {
        try {
            const normalizada = denominacion.trim().toUpperCase();
            return await this.baseQueryWithDeleted()
                .where(`UPPER(${this.ALIAS}.denominacion) = :denominacion`, {
                denominacion: normalizada,
            })
                .getOne();
        }
        catch (error) {
            this.logger.error(error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async getTipoMovimiento(uow, id) {
        const repo = uow.getRepository(alicuota_iva_entity_1.AlicuotaIva);
        return await repo.findOne({
            where: { id },
            withDeleted: true,
        });
    }
    async findAllListado() {
        try {
            const query = this.repository
                .createQueryBuilder('alicuotaIva')
                .where('alicuotaIva.deletedAt IS NULL');
            return await query
                .orderBy('alicuotaIva.denominacion', 'ASC')
                .getMany();
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
};
exports.AlicuotaIvaPersistenceAdapter = AlicuotaIvaPersistenceAdapter;
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_alicuota_iva_dto_1.CreateAlicuotaIvaDto]),
    __metadata("design:returntype", Promise)
], AlicuotaIvaPersistenceAdapter.prototype, "create", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AlicuotaIvaPersistenceAdapter.prototype, "update", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alicuota_iva_entity_1.AlicuotaIva,
        usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], AlicuotaIvaPersistenceAdapter.prototype, "remove", null);
exports.AlicuotaIvaPersistenceAdapter = AlicuotaIvaPersistenceAdapter = AlicuotaIvaPersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alicuota_iva_entity_1.AlicuotaIva)),
    __param(2, (0, common_1.Inject)('UnitOfWork')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource, Object])
], AlicuotaIvaPersistenceAdapter);
//# sourceMappingURL=alicuota-iva.persistence-adapters.js.map