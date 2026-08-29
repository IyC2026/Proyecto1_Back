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
var ProvinciaPersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinciaPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const entity_notFound_exceptions_1 = require("../../../../common/exceptions/entity-notFound-exceptions");
const create_provincia_dto_1 = require("../../dto/create-provincia.dto");
const transactional_decoratos_1 = require("../../../../common/decorators/transactional.decoratos");
const provincia_entity_1 = require("../../domain/entities/provincia.entity");
let ProvinciaPersistenceAdapter = ProvinciaPersistenceAdapter_1 = class ProvinciaPersistenceAdapter {
    constructor(repository, dataSource, uow) {
        this.repository = repository;
        this.dataSource = dataSource;
        this.uow = uow;
        this.logger = new common_1.Logger(ProvinciaPersistenceAdapter_1.name);
        this.ENTITY_NAME = 'Provincia';
    }
    async create(data) {
        const repo = this.uow.getRepository(provincia_entity_1.Provincia);
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
            const entity = await this.repository.findOne({ where: { denominacion, deletedAt: (0, typeorm_1.IsNull)() } });
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
                    denominacion: (0, typeorm_1.ILike)(`%${denominacion}%`),
                    deletedAt: (0, typeorm_1.IsNull)()
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
        const repo = this.uow.getRepository(provincia_entity_1.Provincia);
        const existente = await repo.findOneBy({ id });
        if (!existente)
            throw new Error('Marca no encontrada');
        repo.merge(existente, data);
        return await repo.save(existente);
    }
    async remove(entity) {
        const repo = this.uow.getRepository(provincia_entity_1.Provincia);
        entity.deletedAt = new Date();
        await repo.save(entity);
        return entity;
    }
};
exports.ProvinciaPersistenceAdapter = ProvinciaPersistenceAdapter;
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_provincia_dto_1.CreateProvinciaDto]),
    __metadata("design:returntype", Promise)
], ProvinciaPersistenceAdapter.prototype, "create", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProvinciaPersistenceAdapter.prototype, "update", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provincia_entity_1.Provincia]),
    __metadata("design:returntype", Promise)
], ProvinciaPersistenceAdapter.prototype, "remove", null);
exports.ProvinciaPersistenceAdapter = ProvinciaPersistenceAdapter = ProvinciaPersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(provincia_entity_1.Provincia)),
    __param(2, (0, common_1.Inject)('UnitOfWork')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource, Object])
], ProvinciaPersistenceAdapter);
//# sourceMappingURL=provincia.pesistence-adapter.js.map