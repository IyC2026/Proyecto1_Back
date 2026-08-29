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
var ClienteRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const common_1 = require("@nestjs/common");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const cliente_persistence_adapters_1 = require("./cliente.persistence-adapters");
let ClienteRepository = ClienteRepository_1 = class ClienteRepository {
    constructor(persistenceService) {
        this.persistenceService = persistenceService;
        this.logger = new common_1.Logger(ClienteRepository_1.name);
        this.ENTITY_NAME = 'Cliente';
    }
    async create(data, categoriaIVA, ciudad, personal, usuario) {
        this.logger.log(`Creando un nuevo 1 ...`);
        try {
            return await this.persistenceService.create(data, categoriaIVA, ciudad, personal, usuario);
        }
        catch (error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
            throw new database_connection_exception_1.DatabaseConnectionException('No se pudo crear la entidad en la base de datos.');
        }
    }
    async update(id, data, categoriaIVA, localidad, personal, usuario) {
        return this.persistenceService.update(id, data, categoriaIVA, localidad, personal, usuario);
    }
    async findByIdConAuditoria(id) {
        const entity = await this.persistenceService.findByIdConAuditoria(id);
        return entity;
    }
    async findByDenominacionFiltered(denominacion, skip = 0, take = 10) {
        this.logger.log(`Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        return this.persistenceService.findByDenominacionFiltered(denominacion, skip, take);
    }
    async findBy(denominacion, condicionIvaId, incluirEliminados, empresaId, conSaldo, skip = 0, take = 10) {
        this.logger.log(`Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        return this.persistenceService.findBy(denominacion, condicionIvaId, incluirEliminados, empresaId, conSaldo, skip, take);
    }
    async findAllByDenominacion(denominacion) {
        this.logger.log(`Buscando o ${denominacion} `);
        return this.persistenceService.findAllByDenominacion(denominacion);
    }
    async findAllByDenominacionAndCodigo(denominacion) {
        this.logger.log(`Buscando o ${denominacion} `);
        return this.persistenceService.findAllByDenominacionAndCodigo(denominacion);
    }
    async findOne(id) {
        const entity = await this.persistenceService.findOne(id);
        return entity;
    }
    async findOneWithRelations(id) {
        const entity = await this.persistenceService.findOneWithRelations(id);
        return entity;
    }
    async findByDenominacion(denominacion) {
        const entity = await this.persistenceService.findByDenominacion(denominacion);
        if (!entity) {
            this.logger.warn(`No se encontró ${this.ENTITY_NAME} con denominación: ${denominacion}`);
            return null;
        }
        return entity;
    }
    async remove(id, usuario) {
        const entity = this.persistenceService.remove(id, usuario);
        return entity;
    }
    async findByCuit(cuit) {
        return this.persistenceService.findByCuit(cuit);
    }
    async findByDni(dni) {
        return this.persistenceService.findByDni(dni);
    }
};
exports.ClienteRepository = ClienteRepository;
exports.ClienteRepository = ClienteRepository = ClienteRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cliente_persistence_adapters_1.ClientePersistenceAdapter])
], ClienteRepository);
//# sourceMappingURL=cliente.repository.js.map