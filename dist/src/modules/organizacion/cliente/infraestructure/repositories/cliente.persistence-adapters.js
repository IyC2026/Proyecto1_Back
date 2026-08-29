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
var ClientePersistenceAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientePersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const create_cliente_dto_1 = require("../../dto/create-cliente.dto");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const entity_notFound_exceptions_1 = require("../../../../common/exceptions/entity-notFound-exceptions");
const update_cliente_dto_1 = require("../../dto/update-cliente.dto");
const domicilio_service_1 = require("../../../../gutil/domicilio/domicilio.service");
const localidad_entity_1 = require("../../../../gutil/localidad/domain/entities/localidad.entity");
const transactional_decoratos_1 = require("../../../../common/decorators/transactional.decoratos");
const domicilio_entity_1 = require("../../../../gutil/domicilio/entities/domicilio.entity");
const usuario_entity_1 = require("../../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const personal_entity_1 = require("../../../personal/domain/entities/personal.entity");
const cliente_entity_1 = require("../../domain/entities/cliente.entity");
const condicion_iva_entity_1 = require("../../../../gutil/condicion-iva/domain/entities/condicion-iva.entity");
const database_error_helper_1 = require("../../../../common/query-builders/database-error.helper");
let ClientePersistenceAdapter = ClientePersistenceAdapter_1 = class ClientePersistenceAdapter {
    constructor(repository, domicilioService, dataSource, uow) {
        this.repository = repository;
        this.domicilioService = domicilioService;
        this.dataSource = dataSource;
        this.uow = uow;
        this.logger = new common_1.Logger(ClientePersistenceAdapter_1.name);
        this.ENTITY_NAME = 'Cliente';
    }
    async create(data, condicionIva, ciudad, personal, usuario) {
        try {
            const repo = this.uow.getRepository(cliente_entity_1.Cliente);
            const domicilioGuardado = await this.domicilioService.create(this.uow, ciudad, data.domicilio.direccion, data.usuarioCreatedId);
            this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con denominación: ${condicionIva.denominacion}`);
            const nuevaEntity = repo.create({
                ...data,
                condicionIva: condicionIva,
                domicilio: domicilioGuardado,
                personal: personal,
                personalId: personal.id,
                usuarioCreated: usuario,
            });
            const entityGuardada = repo.save(nuevaEntity);
            return entityGuardada;
        }
        catch (error) {
            (0, database_error_helper_1.handleDatabaseError)(this.logger, 'created', error);
        }
    }
    async findOne(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('cliente')
                .leftJoinAndSelect('cliente.condicionIva', 'condicionIva')
                .leftJoinAndSelect('cliente.domicilio', 'domicilio')
                .leftJoinAndSelect('cliente.personal', 'personal')
                .leftJoinAndSelect('domicilio.localidad', 'localidad')
                .leftJoinAndSelect('localidad.provincia', 'provincia')
                .where('cliente.id = :id', { id })
                .andWhere('cliente.deletedAt IS NULL')
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
    async findOneWithRelations(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('cliente')
                .leftJoinAndSelect('cliente.condicionIva', 'condicionIva')
                .leftJoinAndSelect('cliente.domicilio', 'domicilio')
                .leftJoinAndSelect('cliente.personal', 'personal')
                .leftJoinAndSelect('domicilio.localidad', 'localidad')
                .leftJoinAndSelect('localidad.provincia', 'provincia')
                .where('cliente.id = :id', { id })
                .andWhere('cliente.deletedAt IS NULL')
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
    async findByDenominacion(denominacion) {
        const entity = await this.repository.findOne({
            where: { denominacion, deletedAt: (0, typeorm_1.IsNull)() },
        });
        return entity;
    }
    async findByIdConAuditoria(id) {
        try {
            const entity = await this.repository
                .createQueryBuilder('cliente')
                .leftJoinAndSelect('cliente.usuarioCreated', 'usuarioCreated')
                .leftJoinAndSelect('cliente.usuarioUpdated', 'usuarioUpdated')
                .leftJoinAndSelect('cliente.usuarioDeleted', 'usuarioDeleted')
                .where('cliente.id = :id', { id })
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
    async findByDenominacionFiltered(denominacion, skip = 0, take = 10) {
        try {
            return await this.repository
                .createQueryBuilder('cliente')
                .leftJoinAndSelect('cliente.condicionIva', 'condicionIva')
                .leftJoinAndSelect('cliente.domicilio', 'domicilio')
                .leftJoinAndSelect('cliente.personal', 'personal')
                .where('UPPER(cliente.denominacion) LIKE :denominacion', {
                denominacion: `%${denominacion}%`,
            })
                .andWhere('cliente.deletedAt IS NULL')
                .orderBy('cliente.denominacion', 'ASC')
                .skip(skip)
                .take(take)
                .getMany();
        }
        catch (error) {
            console.error('Error al ejecutar el query:', error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findBy(denominacion, condicionIvaId, incluirEliminados, empresaId, conSaldo, skip = 0, take = 10) {
        try {
            const query = this.repository
                .createQueryBuilder('cliente')
                .leftJoinAndSelect('cliente.condicionIva', 'condicionIva')
                .leftJoinAndSelect('cliente.domicilio', 'domicilio')
                .leftJoinAndSelect('cliente.personal', 'personal')
                .where('(UPPER(cliente.denominacion) LIKE :denominacion OR UPPER(cliente.codigo) = :codigo)', {
                denominacion: `%${denominacion.toUpperCase()}%`,
                codigo: denominacion.toUpperCase(),
            })
                .andWhere('cliente.deletedAt IS NULL');
            if (condicionIvaId && condicionIvaId > 0) {
                query.andWhere('cliente.condicion_iva_id = :condicionIvaId', {
                    condicionIvaId,
                });
            }
            if (empresaId && empresaId > 0) {
                if (empresaId === 1) {
                    if (conSaldo) {
                        query.andWhere('cuenta.saldo > 0');
                    }
                }
                if (empresaId === 2) {
                    if (conSaldo) {
                        query.andWhere('cuentaRespaldo.saldo > 0');
                    }
                }
            }
            const [data, total] = await query
                .orderBy('cliente.denominacion', 'ASC')
                .skip(skip)
                .take(take)
                .getManyAndCount();
            return { data, total };
        }
        catch (error) {
            console.error('Error al ejecutar el query:', error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findAllByDenominacion(denominacion) {
        try {
            return await this.repository
                .createQueryBuilder('cliente')
                .leftJoinAndSelect('cliente.condicionIva', 'condicionIva')
                .leftJoinAndSelect('cliente.domicilio', 'domicilio')
                .leftJoinAndSelect('domicilio.localidad', 'localidad')
                .leftJoinAndSelect('localidad.provincia', 'provincia')
                .leftJoinAndSelect('cliente.personal', 'personal')
                .where('(UPPER(cliente.denominacion) LIKE :denominacion OR UPPER(cliente.codigo) = :codigo)', {
                denominacion: `%${denominacion.toUpperCase()}%`,
                codigo: denominacion.toUpperCase(),
            })
                .andWhere('cliente.deletedAt IS NULL')
                .orderBy('cliente.denominacion', 'ASC')
                .getMany();
        }
        catch (error) {
            console.error('Error al ejecutar el query:', error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async findAllByDenominacionAndCodigo(denominacion) {
        try {
            return await this.repository
                .createQueryBuilder('cliente')
                .leftJoinAndSelect('cliente.condicionIva', 'condicionIva')
                .leftJoinAndSelect('cliente.domicilio', 'domicilio')
                .leftJoinAndSelect('domicilio.localidad', 'localidad')
                .leftJoinAndSelect('localidad.provincia', 'provincia')
                .leftJoinAndSelect('cliente.personal', 'personal')
                .where('(UPPER(cliente.denominacion) LIKE :denominacion OR cliente.codigo = :codigo)', {
                denominacion: `%${denominacion.toUpperCase()}%`,
                codigo: denominacion,
            })
                .andWhere('cliente.deletedAt IS NULL')
                .orderBy('cliente.denominacion', 'ASC')
                .getMany();
        }
        catch (error) {
            console.error('Error al ejecutar el query:', error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al conectar con la base de datos.');
        }
    }
    async update(id, data, condicionIva, localidad, personal, usuario) {
        const clienteRepo = this.uow.getRepository(cliente_entity_1.Cliente);
        const domicilioRepo = this.uow.getRepository(domicilio_entity_1.Domicilio);
        try {
            const entity = await this.findOne(id);
            if (!entity) {
                throw new common_1.NotFoundException(`El cliente con ID ${id} no fue encontrado`);
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
            Object.assign(entity, resto, { condicionIva, personal });
            const entityActualizada = await clienteRepo.save(entity);
            return entityActualizada;
        }
        catch (error) {
            console.error(error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
    }
    async remove(id, usuario) {
        const clienteRepo = this.uow.getRepository(cliente_entity_1.Cliente);
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
                entity.domicilio.usuarioDeletedId = usuario.id;
                await domicilioRepo.save(entity.domicilio);
            }
            entity.deletedAt = fechaEliminacion;
            entity.usuarioDeleted = usuario;
            return await clienteRepo.save(entity);
        }
        catch (error) {
            console.error(error);
            throw new database_connection_exception_1.DatabaseConnectionException('Error al guardar en la base de datos.');
        }
    }
    async findByCuit(cuit) {
        if (!cuit?.trim())
            return null;
        return await this.repository
            .createQueryBuilder('cliente')
            .where('cliente.cuit = :cuit', { cuit: cuit.trim() })
            .andWhere('cliente.deletedAt IS NULL')
            .getOne();
    }
    async findByDni(dni) {
        if (!dni?.trim())
            return null;
        return await this.repository
            .createQueryBuilder('cliente')
            .where('cliente.dni = :dni', { dni: dni.trim() })
            .andWhere('cliente.deletedAt IS NULL')
            .getOne();
    }
};
exports.ClientePersistenceAdapter = ClientePersistenceAdapter;
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto,
        condicion_iva_entity_1.CondicionIva,
        localidad_entity_1.Localidad,
        personal_entity_1.Personal,
        usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], ClientePersistenceAdapter.prototype, "create", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_cliente_dto_1.UpdateClienteDto,
        condicion_iva_entity_1.CondicionIva,
        localidad_entity_1.Localidad,
        personal_entity_1.Personal,
        usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], ClientePersistenceAdapter.prototype, "update", null);
__decorate([
    (0, transactional_decoratos_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], ClientePersistenceAdapter.prototype, "remove", null);
exports.ClientePersistenceAdapter = ClientePersistenceAdapter = ClientePersistenceAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(cliente_entity_1.Cliente)),
    __param(3, (0, common_1.Inject)('UnitOfWork')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        domicilio_service_1.DomicilioService,
        typeorm_1.DataSource, Object])
], ClientePersistenceAdapter);
//# sourceMappingURL=cliente.persistence-adapters.js.map