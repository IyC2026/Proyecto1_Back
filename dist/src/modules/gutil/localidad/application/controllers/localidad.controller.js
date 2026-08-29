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
var LocalidadController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalidadController = void 0;
const common_1 = require("@nestjs/common");
const localidad_service_1 = require("../services/localidad.service");
const create_localidad_dto_1 = require("../../dto/create-localidad.dto");
const update_localidad_dto_1 = require("../../dto/update-localidad.dto");
const normalize_denominations_pipe_1 = require("../../../../common/pipes/normalize-denominations.pipe");
const auth_guard_1 = require("../../../../gestion-usuario/auth/auth.guard");
const roles_decorator_1 = require("../../../../gestion-usuario/auth/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const listadoConTotalDto_1 = require("../../../../common/interface/listadoConTotalDto");
const localidad_dto_1 = require("../../dto/localidad.dto");
const search_localidad_dto_1 = require("../../dto/search-localidad.dto");
const normalize_denominations_search_pipe_1 = require("../../../../common/pipes/normalize-denominations-search.pipe");
const auditoria_dto_1 = require("../../../../gestion-sistema/auditoria/dto/auditoria.dto");
let LocalidadController = LocalidadController_1 = class LocalidadController {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger(LocalidadController_1.name);
        this.ENTITY_NAME = 'Localidad';
    }
    create(createDto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME}...`);
        return this.service.create(createDto);
    }
    findByDenominacionFiltered(paginationDto) {
        const { denominacion = '', provinciaId = 0, skip, take, incluirEliminados, } = paginationDto;
        this.logger.log(`Buscando localidades con denominación: ${denominacion}`);
        return this.service.findBy(denominacion, provinciaId, skip, take, incluirEliminados);
    }
    findOne(id) {
        this.logger.log(`Buscando  ${this.ENTITY_NAME} con ID: ${id}`);
        return this.service.findDtoById(+id);
    }
    update(id, updateDto) {
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
        return this.service.update(id, updateDto);
    }
    remove(id) {
        this.logger.warn(`Eliminando  ${this.ENTITY_NAME} con ID: ${id}`);
        return this.service.remove(id);
    }
    findAllProvincia() {
        return this.service.findAllProvincia();
    }
    async findByIdConAuditoria(id) {
        const data = await this.service.findByIdConAuditoria(id);
        return data;
    }
};
exports.LocalidadController = LocalidadController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_localidad_dto_1.CreateLocalidadDto]),
    __metadata("design:returntype", void 0)
], LocalidadController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('search-by'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, common_1.UsePipes)(normalize_denominations_search_pipe_1.NormalizeDenominacionSearchPipe),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_localidad_dto_1.SearchLocalidadDto]),
    __metadata("design:returntype", void 0)
], LocalidadController.prototype, "findByDenominacionFiltered", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, swagger_1.ApiOkResponse)({ type: localidad_dto_1.LocalidadDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocalidadController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_localidad_dto_1.UpdateLocalidadDto]),
    __metadata("design:returntype", void 0)
], LocalidadController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LocalidadController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('find-all-for-provincias/select'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar las provincias' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Listado de provincias',
        type: listadoConTotalDto_1.ListadoConTotalDto,
    }),
    (0, swagger_1.ApiTags)('Provincia'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalidadController.prototype, "findAllProvincia", null);
__decorate([
    (0, common_1.Get)(':id/audit'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Informacion de auditoria',
        type: auditoria_dto_1.AuditoriaDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocalidadController.prototype, "findByIdConAuditoria", null);
exports.LocalidadController = LocalidadController = LocalidadController_1 = __decorate([
    (0, swagger_1.ApiTags)('GUtil'),
    (0, common_1.Controller)('localidad'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [localidad_service_1.LocalidadService])
], LocalidadController);
//# sourceMappingURL=localidad.controller.js.map