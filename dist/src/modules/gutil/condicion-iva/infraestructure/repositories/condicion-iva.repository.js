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
var CondicionIVARepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CondicionIVARepository = void 0;
const common_1 = require("@nestjs/common");
const condicion_iva_persistence_adapters_1 = require("./condicion-iva.persistence-adapters");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
let CondicionIVARepository = CondicionIVARepository_1 = class CondicionIVARepository {
    constructor(persistenceService) {
        this.persistenceService = persistenceService;
        this.logger = new common_1.Logger(CondicionIVARepository_1.name);
        this.ENTITY_NAME = 'Condicion IVA';
    }
    async create(data) {
        this.logger.log(`Creando un nuevo `);
        try {
            return await this.persistenceService.create(data);
        }
        catch (error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
            throw new database_connection_exception_1.DatabaseConnectionException('No se pudo crear la entidad en la base de datos.');
        }
    }
    async update(id, data) {
        return this.persistenceService.update(id, data);
    }
    async findAll(skip = 0, take = 10) {
        return this.persistenceService.findAll(skip, take);
    }
    async findAllListado() {
        return await this.persistenceService.findAllListado();
    }
    async findByDenominacionFiltered(denominacion, skip = 0, take = 10) {
        this.logger.log(`Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        return this.persistenceService.findByDenominacionFiltered(denominacion, skip, take);
    }
    async findAllFor() {
        return this.persistenceService.findAllFor();
    }
    async findOne(id) {
        const entity = await this.persistenceService.findOne(id);
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
    async remove(data) {
        const entity = this.persistenceService.remove(data);
        return entity;
    }
    async findByIdConAuditoria(id) {
        const entity = await this.persistenceService.findByIdConAuditoria(id);
        return entity;
    }
};
exports.CondicionIVARepository = CondicionIVARepository;
exports.CondicionIVARepository = CondicionIVARepository = CondicionIVARepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [condicion_iva_persistence_adapters_1.CondicionIvaPersistenceAdapter])
], CondicionIVARepository);
//# sourceMappingURL=condicion-iva.repository.js.map