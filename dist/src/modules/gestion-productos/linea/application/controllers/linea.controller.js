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
var LineaController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineaController = void 0;
const common_1 = require("@nestjs/common");
const pagination_with_denominacion_dto_1 = require("../../../../common/dto/busquedas/pagination-with-denominacion.dto");
const normalize_denominations_pipe_1 = require("../../../../common/pipes/normalize-denominations.pipe");
const auth_guard_1 = require("../../../../gestion-usuario/auth/auth.guard");
const roles_decorator_1 = require("../../../../gestion-usuario/auth/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const normalize_denominations_search_pipe_1 = require("../../../../common/pipes/normalize-denominations-search.pipe");
const auditoria_dto_1 = require("../../../../gestion-sistema/auditoria/dto/auditoria.dto");
const linea_service_1 = require("../services/linea.service");
const create_linea_dto_1 = require("../../dto/create-linea.dto");
const linea_dto_1 = require("../../dto/linea.dto");
const update_linea_dto_1 = require("../../dto/update-linea.dto");
let LineaController = LineaController_1 = class LineaController {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger(LineaController_1.name);
        this.ENTITY_NAME = 'Linea';
    }
    create(createDto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME}...`);
        return this.service.create(createDto);
    }
    findByDenominacionFiltered(paginationDto) {
        const { denominacion = '', skip, take, incluirEliminados } = paginationDto;
        this.logger.log(`Buscando usuarios con denominación: ${denominacion}`);
        return this.service.findByDenominacionFiltered(denominacion, skip, take, incluirEliminados);
    }
    findOne(id) {
        this.logger.log(`Buscando  ${this.ENTITY_NAME} con ID: ${id}`);
        return this.service.findDtoById(+id);
    }
    update(id, updateDto) {
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
        return this.service.update(id, updateDto);
    }
    remove(id, usuarioId) {
        this.logger.warn(`Eliminando ${this.ENTITY_NAME} con ID: ${id} por usuario: ${usuarioId}`);
        return this.service.remove(id, usuarioId);
    }
    async findByIdConAuditoria(id) {
        const data = await this.service.findByIdConAuditoria(id);
        return data;
    }
};
exports.LineaController = LineaController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_linea_dto_1.CreateLineaDto]),
    __metadata("design:returntype", void 0)
], LineaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('search-by'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, common_1.UsePipes)(normalize_denominations_search_pipe_1.NormalizeDenominacionSearchPipe),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_with_denominacion_dto_1.PaginationWithDenominacionDto]),
    __metadata("design:returntype", void 0)
], LineaController.prototype, "findByDenominacionFiltered", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: linea_dto_1.LineaDto }),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LineaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_linea_dto_1.UpdateLineaDto]),
    __metadata("design:returntype", void 0)
], LineaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('usuarioId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], LineaController.prototype, "remove", null);
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
], LineaController.prototype, "findByIdConAuditoria", null);
exports.LineaController = LineaController = LineaController_1 = __decorate([
    (0, swagger_1.ApiTags)('Gestion Productos'),
    (0, common_1.Controller)('linea'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [linea_service_1.LineaService])
], LineaController);
//# sourceMappingURL=linea.controller.js.map