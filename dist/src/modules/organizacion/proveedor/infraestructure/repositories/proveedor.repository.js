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
var ProveedorRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorRepository = void 0;
const common_1 = require("@nestjs/common");
const proveedor_persistence_adapters_1 = require("./proveedor.persistence-adapters");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
let ProveedorRepository = ProveedorRepository_1 = class ProveedorRepository {
    constructor(persistenceService) {
        this.persistenceService = persistenceService;
        this.logger = new common_1.Logger(ProveedorRepository_1.name);
        this.ENTITY_NAME = 'Proveedor';
    }
    async create(data, categoriaIVA, localidad, usuario) {
        this.logger.log(`Creando un nuevo 1 ...`);
        try {
            return await this.persistenceService.create(data, categoriaIVA, localidad, usuario);
        }
        catch (error) {
            throw new database_connection_exception_1.DatabaseConnectionException('No se pudo crear la entidad en la base de datos.');
        }
    }
    async update(id, data, categoriaIVA, localidad, usuario) {
        return this.persistenceService.update(id, data, categoriaIVA, localidad, usuario);
    }
    async findByIdConAuditoria(id) {
        const entity = await this.persistenceService.findByIdConAuditoria(id);
        return entity;
    }
    async findAll(skip = 0, take = 10) {
        return this.persistenceService.findAll(skip, take);
    }
    async findBy(denominacion, condicionIvaId, incluirEliminados, empresaId, conSaldo, skip = 0, take = 10) {
        this.logger.log(`Buscando Ro ${denominacion}  skip=${skip}, take=${take}`);
        return this.persistenceService.findBy(denominacion, condicionIvaId, incluirEliminados, empresaId, conSaldo, skip, take);
    }
    async findAllByDenominacion(denominacion) {
        this.logger.log(`Buscando o ${denominacion} `);
        return this.persistenceService.findAllByDenominacion(denominacion);
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
    async remove(id) {
        const entity = this.persistenceService.remove(id);
        return entity;
    }
    async findAllFor(denominacion) {
        return this.persistenceService.findAllFor(denominacion);
    }
    async findAllSistemaFor(denominacion) {
        return this.persistenceService.findAllSistemaFor(denominacion);
    }
    async findAllSinSistemaFor(denominacion) {
        return this.persistenceService.findAllSinSistemaFor(denominacion);
    }
    async findByCuit(cuit) {
        return this.persistenceService.findByCuit(cuit);
    }
    async findPendientesByProveedores(proveedoresIds) {
        return this.persistenceService.findPendientesByProveedores(proveedoresIds);
    }
    async findAllByTipo(denominacion, compra, gasto) {
        return this.persistenceService.findAllByTipo(denominacion, compra, gasto);
    }
};
exports.ProveedorRepository = ProveedorRepository;
exports.ProveedorRepository = ProveedorRepository = ProveedorRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [proveedor_persistence_adapters_1.ProveedorPersistenceAdapter])
], ProveedorRepository);
//# sourceMappingURL=proveedor.repository.js.map