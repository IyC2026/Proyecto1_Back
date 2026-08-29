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
var AlicuotaIvaRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicuotaIvaRepository = void 0;
const common_1 = require("@nestjs/common");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const alicuota_iva_persistence_adapters_1 = require("./alicuota-iva.persistence-adapters");
let AlicuotaIvaRepository = AlicuotaIvaRepository_1 = class AlicuotaIvaRepository {
    constructor(persistenceService) {
        this.persistenceService = persistenceService;
        this.logger = new common_1.Logger(AlicuotaIvaRepository_1.name);
        this.ENTITY_NAME = 'AlicuotaIva';
    }
    async create(data) {
        try {
            return await this.persistenceService.create(data);
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('No se pudo crear la entidad en la base de datos.');
        }
    }
    async update(id, data) {
        return this.persistenceService.update(id, data);
    }
    async findAllFor(denominacion) {
        return this.persistenceService.findAllFor(denominacion);
    }
    async findAllListado() {
        return this.persistenceService.findAllListado();
    }
    async findAllSinSistemaFor(denominacion) {
        return this.persistenceService.findAllSinSistemaFor(denominacion);
    }
    async findAllSistemaFor(denominacion) {
        return this.persistenceService.findAllSistemaFor(denominacion);
    }
    async findBy(denominacion, skip = 0, take = 10) {
        this.logger.log(`Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        return this.persistenceService.findBy(denominacion, skip, take);
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
    async findByIdConAuditoria(id) {
        const entity = await this.persistenceService.findByIdConAuditoria(id);
        return entity;
    }
    async remove(data, usuario) {
        const entity = this.persistenceService.remove(data, usuario);
        return entity;
    }
    async findByDenominacionWith(denominacion) {
        const entity = await this.persistenceService.findByDenominacionWith(denominacion);
        return entity;
    }
};
exports.AlicuotaIvaRepository = AlicuotaIvaRepository;
exports.AlicuotaIvaRepository = AlicuotaIvaRepository = AlicuotaIvaRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [alicuota_iva_persistence_adapters_1.AlicuotaIvaPersistenceAdapter])
], AlicuotaIvaRepository);
//# sourceMappingURL=alicuota-iva.repository.js.map