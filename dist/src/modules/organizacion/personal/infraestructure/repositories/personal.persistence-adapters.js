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
var PersonalPersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const entity_notFound_exceptions_1 = require("../../../../common/exceptions/entity-notFound-exceptions");
const create_personal_dto_1 = require("../../dto/create-personal.dto");
const update_personal_dto_1 = require("../../dto/update-personal.dto");
const personal_entity_1 = require("../../domain/entities/personal.entity");
const transactional_decoratos_1 = require("../../../../common/decorators/transactional.decoratos");
const usuario_entity_1 = require("../../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const usuario_service_1 = require("../../../../gestion-usuario/usuario/application/services/usuario.service");
const domicilio_entity_1 = require("../../../../gutil/domicilio/entities/domicilio.entity");
const localidad_entity_1 = require("../../../../gutil/localidad/domain/entities/localidad.entity");
const base_persistence_adapter_1 = require("../../../../common/persistence/base-persistence.adapter");
const query_builder_helpers_1 = require("../../../../common/query-builders/query-builder-helpers");
const database_error_helper_1 = require("../../../../common/query-builders/database-error.helper");
let PersonalPersistenceAdapter = PersonalPersistenceAdapter_1 = class PersonalPersistenceAdapter extends base_persistence_adapter_1.BasePersistenceAdapter {
    constructor(repository, usuarioService, dataSource, uow) {
        super(repository);
        this.usuarioService = usuarioService;
        this.dataSource = dataSource;
        this.uow = uow;
        this.logger = new common_1.Logger(PersonalPersistenceAdapter_1.name);
        this.ALIAS = 'personal';
        this.ENTITY_NAME = 'Personal';
    }
    async create(data, usuario) {
        const repo = this.uow.getRepository(personal_entity_1.Personal);
        const localidadRepo = this.uow.getRepository(localidad_entity_1.Localidad);
        const localidad = await localidadRepo.findOneByOrFail({ id: 1 });
        const domicilio = new domicilio_entity_1.Domicilio();
        if (domicilio) {
            domicilio.createdAt = new Date();
            domicilio.usuarioCreatedId = usuario.id;
            domicilio.localidad = localidad;
        }
        const nuevaEntity = repo.create({
            ...data,
            domicilio: domicilio,
            usuarioCreated: usuario,
        });
        const entityGuardada = await repo.save(nuevaEntity);
        const usuarioGuardado = await this.usuarioService.createUsuarioFor(entityGuardada, this.uow);
        entityGuardada.usuario = usuarioGuardado;
        await repo.save(entityGuardada);
        return entityGuardada;
    }
    async findAll(skip = 0, take = 10) {
        try {
            return await this.repository.find({
                where: { deletedAt: (0, typeorm_1.IsNull)() },
                skip,
                take,
                order: { denominacion: 'DESC' },
            });
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findAllFor(denominacion) {
        try {
            const query = this.repository
                .createQueryBuilder('personal')
                .where('personal.deletedAt IS NULL');
            query.andWhere('UPPER(personal.denominacion) LIKE :denominacion', {
                denominacion: `%${denominacion}%`,
            });
            return await query.orderBy('personal.denominacion', 'ASC').getMany();
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findOne(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('personal')
                .where('personal.id = :id', { id })
                .andWhere('personal.deletedAt IS NULL')
                .getOne();
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
    async findAllListado() {
        try {
            const query = this.repository
                .createQueryBuilder('personal')
                .where('personal.deletedAt IS NULL');
            return await query.orderBy('personal.denominacion', 'ASC').getMany();
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findByIdConAuditoria(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('personal')
                .leftJoinAndSelect('personal.usuarioCreated', 'usuarioCreated')
                .leftJoinAndSelect('personal.usuarioUpdated', 'usuarioUpdated')
                .leftJoinAndSelect('personal.usuarioDeleted', 'usuarioDeleted')
                .where('personal.id = :id', { id })
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
                where: { denominacion, deletedAt: (0, typeorm_1.IsNull)() },
            });
            return entity;
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException(`Error al conectar con la base de datos.1 } `);
        }
    }
    async findAllVendedorFor(denominacion) {
        try {
            const query = this.repository
                .createQueryBuilder('personal')
                .where('personal.deletedAt IS NULL')
                .andWhere('personal.esVendedor = true')
                .andWhere('UPPER(personal.denominacion) LIKE :denominacion', {
                denominacion: `%${denominacion.toUpperCase()}%`,
            });
            return await query.orderBy('personal.denominacion', 'ASC').getMany();
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findBy(denominacion, skip = 0, take = 10, incluirEliminados = false) {
        try {
            let query = this.baseQuery();
            query = query_builder_helpers_1.QueryBuilderHelper.applyDeletedFilter(query, incluirEliminados);
            if (denominacion) {
                query.andWhere(`UPPER(${this.ALIAS}.denominacion) LIKE :denominacion`, {
                    denominacion: `%${denominacion.toUpperCase()}%`,
                });
            }
            query = query_builder_helpers_1.QueryBuilderHelper.applyOrder(query, this.ALIAS, 'denominacion', 'ASC');
            query = query_builder_helpers_1.QueryBuilderHelper.applyPagination(query, skip, take);
            const [data, total] = await query.getManyAndCount();
            return { data, total };
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findBy', error);
        }
    }
    async update(id, data, usuario) {
        const personalRepo = this.uow.getRepository(personal_entity_1.Personal);
        try {
            const entity = await this.findOne(id);
            if (!entity) {
                throw new common_1.NotFoundException(`El peronsale con ID ${id} no fue encontrado`);
            }
            Object.assign(entity, data, { usuarioUpdatedId: usuario.id });
            const entityActualizada = await personalRepo.save(entity);
            return entityActualizada;
        }
        catch (error) {
            console.error(error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
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
};
exports.PersonalPersistenceAdapter = PersonalPersistenceAdapter;
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_personal_dto_1.CreatePersonalDto, usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], PersonalPersistenceAdapter.prototype, "create", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_personal_dto_1.UpdatePersonalDto,
        usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], PersonalPersistenceAdapter.prototype, "update", null);
exports.PersonalPersistenceAdapter = PersonalPersistenceAdapter = PersonalPersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(personal_entity_1.Personal)),
    __param(3, (0, common_1.Inject)('UnitOfWork')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        usuario_service_1.UsuarioService,
        typeorm_1.DataSource, Object])
], PersonalPersistenceAdapter);
//# sourceMappingURL=personal.persistence-adapters.js.map