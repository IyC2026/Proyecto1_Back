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
var EmpresaRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaRepository = void 0;
const common_1 = require("@nestjs/common");
const empresa_persistence_adapters_1 = require("./empresa.persistence-adapters");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
let EmpresaRepository = EmpresaRepository_1 = class EmpresaRepository {
    constructor(persistenceService) {
        this.persistenceService = persistenceService;
        this.logger = new common_1.Logger(EmpresaRepository_1.name);
        this.ENTITY_NAME = 'Empresa';
    }
    async create(data, categoriaIVA) {
        this.logger.log(`Creando un nuevo 1 ...`);
        try {
            return await this.persistenceService.create(data, categoriaIVA);
        }
        catch (error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
            throw new database_connection_exception_1.DatabaseConnectionException('No se pudo crear la entidad en la base de datos.');
        }
    }
    async update(id, data, categoriaIVA) {
        return this.persistenceService.update(id, data, categoriaIVA);
    }
    async findAll(skip = 0, take = 10) {
        return this.persistenceService.findAll(skip, take);
    }
    async findByDenominacionFiltered(denominacion, skip = 0, take = 10) {
        this.logger.log(`Buscando o ${denominacion}  skip=${skip}, take=${take}`);
        return this.persistenceService.findByDenominacionFiltered(denominacion, skip, take);
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
    async remove(id) {
        const entity = this.persistenceService.remove(id);
        return entity;
    }
    async empresaExist(empresaId) {
        return this.persistenceService.empresaExist(empresaId);
    }
};
exports.EmpresaRepository = EmpresaRepository;
exports.EmpresaRepository = EmpresaRepository = EmpresaRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [empresa_persistence_adapters_1.EmpresaPersistenceAdapter])
], EmpresaRepository);
//# sourceMappingURL=empresa.repository.js.map