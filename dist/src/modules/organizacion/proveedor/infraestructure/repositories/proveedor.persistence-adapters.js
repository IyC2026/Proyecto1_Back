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
var ProveedorPersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const entity_notFound_exceptions_1 = require("../../../../common/exceptions/entity-notFound-exceptions");
const create_proveedor_dto_1 = require("../../dto/create-proveedor.dto");
const update_proveedor_dto_1 = require("../../dto/update-proveedor.dto");
const localidad_entity_1 = require("../../../../gutil/localidad/domain/entities/localidad.entity");
const domicilio_service_1 = require("../../../../gutil/domicilio/domicilio.service");
const domicilio_entity_1 = require("../../../../gutil/domicilio/entities/domicilio.entity");
const transactional_decoratos_1 = require("../../../../common/decorators/transactional.decoratos");
const usuario_entity_1 = require("../../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const condicion_iva_entity_1 = require("../../../../gutil/condicion-iva/domain/entities/condicion-iva.entity");
const proveedor_entity_1 = require("../../domain/entities/proveedor.entity");
const database_error_helper_1 = require("../../../../common/query-builders/database-error.helper");
let ProveedorPersistenceAdapter = ProveedorPersistenceAdapter_1 = class ProveedorPersistenceAdapter {
    constructor(repository, domicilioService, dataSource, uow) {
        this.repository = repository;
        this.domicilioService = domicilioService;
        this.dataSource = dataSource;
        this.uow = uow;
        this.logger = new common_1.Logger(ProveedorPersistenceAdapter_1.name);
        this.ENTITY_NAME = 'Proveedor';
    }
    async create(data, condicionIva, ciudad, usuario) {
        const repo = this.uow.getRepository(proveedor_entity_1.Proveedor);
        const domicilioGuardado = await this.domicilioService.create(this.uow, ciudad, data.domicilio.direccion, data.usuarioCreatedId);
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${condicionIva.denominacion}`);
        const nuevaEntity = repo.create({
            ...data,
            condicionIva: condicionIva,
            domicilio: domicilioGuardado,
            usuarioCreated: usuario,
        });
        let entityGuardada = await repo.save(nuevaEntity);
        return entityGuardada;
    }
    async findOne(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('proveedor')
                .leftJoinAndSelect('proveedor.condicionIva', 'condicionIva')
                .leftJoinAndSelect('proveedor.domicilio', 'domicilio')
                .leftJoinAndSelect('domicilio.localidad', 'localidad')
                .leftJoinAndSelect('localidad.provincia', 'provincia')
                .where('proveedor.id = :id', { id })
                .andWhere('proveedor.deletedAt IS NULL')
                .getOne();
            this.logger.warn(`: ${entity}.`);
            if (!entity) {
                throw new entity_notFound_exceptions_1.EntityNotFoundException('Entidad no encontrada');
            }
            return entity;
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findOne', error);
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
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findByDenominacion', error);
        }
    }
    async findByIdConAuditoria(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('proveedor')
                .leftJoinAndSelect('proveedor.usuarioCreated', 'usuarioCreated')
                .leftJoinAndSelect('proveedor.usuarioUpdated', 'usuarioUpdated')
                .leftJoinAndSelect('proveedor.usuarioDeleted', 'usuarioDeleted')
                .where('proveedor.id = :id', { id })
                .getOne();
            this.logger.warn(`: ${entity}.`);
            if (!entity) {
                throw new entity_notFound_exceptions_1.EntityNotFoundException('Entidad no encontrada.');
            }
            return entity;
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findByIdConAuditoria', error);
        }
    }
    async findBy(denominacion, condicionIvaId, incluirEliminados, empresaId, conSaldo, skip = 0, take = 10) {
        try {
            const query = this.repository
                .createQueryBuilder('proveedor')
                .leftJoinAndSelect('proveedor.condicionIva', 'condicionIva')
                .leftJoinAndSelect('proveedor.domicilio', 'domicilio')
                .where('UPPER(proveedor.denominacion) LIKE :denominacion', {
                denominacion: `%${denominacion.toUpperCase()}%`,
            })
                .andWhere('proveedor.deletedAt IS NULL');
            if (condicionIvaId && condicionIvaId > 0) {
                query.andWhere('proveedor.condicion_iva_id = :condicionIvaId', {
                    condicionIvaId,
                });
            }
            const [data, total] = await query
                .orderBy('proveedor.denominacion', 'ASC')
                .skip(skip)
                .take(take)
                .getManyAndCount();
            return { data, total };
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'findBy', error);
        }
    }
    async findAllByDenominacion(denominacion) {
        try {
            return await this.repository
                .createQueryBuilder('proveedor')
                .leftJoinAndSelect('proveedor.condicionIva', 'condicionIva')
                .leftJoinAndSelect('proveedor.domicilio', 'domicilio')
                .where('UPPER(proveedor.denominacion) LIKE :denominacion', {
                denominacion: `%${denominacion.toUpperCase()}%`,
            })
                .andWhere('proveedor.deletedAt IS NULL')
                .orderBy('proveedor.denominacion', 'ASC')
                .getMany();
        }
        catch (error) {
            console.error('Error al ejecutar el query:', error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findAllByTipo(denominacion, compra, gasto) {
        try {
            console.log('denominacion:', denominacion);
            console.log('compra:', compra);
            console.log('gasto:', gasto);
            const query = this.repository
                .createQueryBuilder('proveedor')
                .leftJoinAndSelect('proveedor.condicionIva', 'condicionIva')
                .leftJoinAndSelect('proveedor.domicilio', 'domicilio')
                .where('UPPER(proveedor.denominacion) LIKE :denominacion', {
                denominacion: `%${denominacion.toUpperCase()}%`,
            })
                .andWhere('proveedor.deletedAt IS NULL');
            if (compra && gasto) {
                query.andWhere('(proveedor.esProveedorMateriaPrima = true OR proveedor.esProveedorGastos = true)');
            }
            else if (compra) {
                query.andWhere('proveedor.esProveedorMateriaPrima = true');
            }
            else if (gasto) {
                query.andWhere('proveedor.esProveedorGastos = true');
            }
            return await query.orderBy('proveedor.denominacion', 'ASC').getMany();
        }
        catch (error) {
            console.error('Error al ejecutar el query:', error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async update(id, data, condicionIva, localidad, usuario) {
        const repo = this.uow.getRepository(proveedor_entity_1.Proveedor);
        const domicilioRepo = this.uow.getRepository(domicilio_entity_1.Domicilio);
        try {
            const entity = await this.findOne(id);
            if (!entity) {
                throw new common_1.NotFoundException(`El proveeodr con ID ${id} no fue encontrado`);
            }
            if (data.domicilio) {
                if (entity.domicilio) {
                    if (data.domicilio.direccion !== undefined) {
                        entity.domicilio.direccion = data.domicilio.direccion;
                    }
                    if (data.domicilio.localidadId !== undefined) {
                        entity.domicilio.localidad = localidad;
                    }
                    entity.domicilio.usuarioUpdatedId = usuario.id;
                    await domicilioRepo.save(entity.domicilio);
                }
                else {
                    const nuevoDomicilio = domicilioRepo.create({
                        direccion: data.domicilio.direccion,
                        localidad: localidad,
                        usuarioCreatedId: usuario.id,
                        usuarioUpdatedId: usuario.id,
                    });
                    const domicilioGuardado = await domicilioRepo.save(nuevoDomicilio);
                    entity.domicilio = domicilioGuardado;
                }
            }
            entity.usuarioUpdated = usuario;
            entity.updatedAt = new Date();
            const { domicilio, ...resto } = data;
            Object.assign(entity, resto, { condicionIva });
            const entityActualizada = await repo.save(entity);
            return entityActualizada;
        }
        catch (error) {
            console.error(error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
    }
    async remove(id) {
        const clienteRepo = this.uow.getRepository(proveedor_entity_1.Proveedor);
        const domicilioRepo = this.uow.getRepository(domicilio_entity_1.Domicilio);
        const entity = await this.findOne(id);
        if (!entity) {
            throw new Error(`${this.ENTITY_NAME} con ID ${id} no encontrada`);
        }
        if (entity.deletedAt) {
            throw new common_1.NotFoundException('Entidad ya eliminada.');
        }
        try {
            const fechaEliminacion = new Date();
            if (entity.domicilio) {
                entity.domicilio.deletedAt = fechaEliminacion;
                await domicilioRepo.save(entity.domicilio);
            }
            entity.deletedAt = fechaEliminacion;
            return await clienteRepo.save(entity);
        }
        catch (error) {
            console.error(error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
    }
    async findAllFor(denominacion) {
        try {
            return await this.repository
                .createQueryBuilder('proveedor')
                .where('proveedor.deletedAt IS NULL')
                .andWhere('UPPER(proveedor.denominacion) LIKE :denominacion', {
                denominacion: `%${denominacion.toUpperCase()}%`,
            })
                .orderBy('proveedor.denominacion', 'ASC')
                .getMany();
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findAllSinSistemaFor(denominacion) {
        try {
            return await this.repository
                .createQueryBuilder('proveedor')
                .where('proveedor.deletedAt IS NULL')
                .andWhere('proveedor.sistema = :sistema', { sistema: 0 })
                .andWhere('UPPER(proveedor.denominacion) LIKE :denominacion', {
                denominacion: `%${denominacion.toUpperCase()}%`,
            })
                .orderBy('proveedor.denominacion', 'ASC')
                .getMany();
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findAllSistemaFor(denominacion) {
        try {
            return await this.repository
                .createQueryBuilder('proveedor')
                .where('proveedor.deletedAt IS NULL')
                .andWhere('proveedor.sistema = :sistema', { sistema: 1 })
                .andWhere('UPPER(proveedor.denominacion) LIKE :denominacion', {
                denominacion: `%${denominacion.toUpperCase()}%`,
            })
                .orderBy('proveedor.denominacion', 'ASC')
                .getMany();
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findByCuit(cuit) {
        if (!cuit?.trim())
            return null;
        return await this.repository
            .createQueryBuilder('proveedor')
            .where('proveedor.cuit = :cuit', { cuit: cuit.trim() })
            .andWhere('proveedor.deletedAt IS NULL')
            .getOne();
    }
};
exports.ProveedorPersistenceAdapter = ProveedorPersistenceAdapter;
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proveedor_dto_1.CreateProveedorDto,
        condicion_iva_entity_1.CondicionIva,
        localidad_entity_1.Localidad,
        usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], ProveedorPersistenceAdapter.prototype, "create", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_proveedor_dto_1.UpdateProveedorDto,
        condicion_iva_entity_1.CondicionIva,
        localidad_entity_1.Localidad,
        usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], ProveedorPersistenceAdapter.prototype, "update", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProveedorPersistenceAdapter.prototype, "remove", null);
exports.ProveedorPersistenceAdapter = ProveedorPersistenceAdapter = ProveedorPersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(proveedor_entity_1.Proveedor)),
    __param(3, (0, common_1.Inject)('UnitOfWork')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        domicilio_service_1.DomicilioService,
        typeorm_1.DataSource, Object])
], ProveedorPersistenceAdapter);
//# sourceMappingURL=proveedor.persistence-adapters.js.map