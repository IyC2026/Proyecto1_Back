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
var ConfiguracionSistemaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfiguracionSistemaService = void 0;
const common_1 = require("@nestjs/common");
const configuracion_sistema_mapper_1 = require("../../mappers/configuracion-sistema.mapper");
let ConfiguracionSistemaService = ConfiguracionSistemaService_1 = class ConfiguracionSistemaService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(ConfiguracionSistemaService_1.name);
        this.ENTITY_NAME = 'ConfiguracionSistema';
    }
    async findDtoById(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return configuracion_sistema_mapper_1.ConfiguracionSistemaMapper.toDto(entity);
    }
    async findDtoByEmpresaId(empresaId) {
        return {
            id: 1,
            empresaId: empresaId,
            caracteresParaBusqueda: 3,
            ocultarTotalesDocumento: false,
            visibleSubTotalNoGravado: true,
            visibleSubTotal: true,
            visibleIva105: true,
            visibleIva21: true,
            precioConIvaVisible: true,
            libroCajaUnica: true,
            carteraChequeUnica: true,
            take: 10,
            estadisticasProducto: true,
            busquedaInicial: true,
            maximoDolar: 1000,
            porcentajeAumento: 0,
            unidadMedida: true,
            precioOferta: false,
            costoDolar: false,
            clientePoseePersonal: false,
            electronica: false,
        };
    }
    async findEntityById(id) {
        const entity = await this.repository.findOne(id);
        if (!entity)
            throw new common_1.NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrado.`);
        return entity;
    }
};
exports.ConfiguracionSistemaService = ConfiguracionSistemaService;
exports.ConfiguracionSistemaService = ConfiguracionSistemaService = ConfiguracionSistemaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IConfiguracionSistemaRepository')),
    __metadata("design:paramtypes", [Object])
], ConfiguracionSistemaService);
//# sourceMappingURL=configuracion-sistema.service.js.map