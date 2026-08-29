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
var ConfiguracionSistemaRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfiguracionSistemaRepository = void 0;
const common_1 = require("@nestjs/common");
const database_connection_exception_1 = require("../../../../common/exceptions/database-connection.exception");
const configuracion_sistema_adapters_1 = require("./configuracion-sistema-adapters");
let ConfiguracionSistemaRepository = ConfiguracionSistemaRepository_1 = class ConfiguracionSistemaRepository {
    constructor(persistenceService) {
        this.persistenceService = persistenceService;
        this.logger = new common_1.Logger(ConfiguracionSistemaRepository_1.name);
        this.ENTITY_NAME = 'Configuracion Sistema';
    }
    async create(data) {
        this.logger.log(`Creando un nuevo `);
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
    async findDtoByEmpresaId(empresaId) {
        return this.persistenceService.findDtoByEmpresaId(empresaId);
    }
    async findOne(id) {
        const entity = await this.persistenceService.findOne(id);
        return entity;
    }
    async remove(data) {
        const entity = this.persistenceService.remove(data);
        return entity;
    }
};
exports.ConfiguracionSistemaRepository = ConfiguracionSistemaRepository;
exports.ConfiguracionSistemaRepository = ConfiguracionSistemaRepository = ConfiguracionSistemaRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [configuracion_sistema_adapters_1.ConfiguracionSistemaPersistenceAdapter])
], ConfiguracionSistemaRepository);
//# sourceMappingURL=configuracion-sistema.repository.js.map