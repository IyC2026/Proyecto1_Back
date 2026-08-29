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
var UsuarioController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("../services/usuario.service");
const auth_guard_1 = require("../../../auth/auth.guard");
const roles_decorator_1 = require("../../../auth/roles.decorator");
const pagination_dto_1 = require("../../../../common/dto/pagination.dto");
const normalize_denominations_pipe_1 = require("../../../../common/pipes/normalize-denominations.pipe");
const updateUsuario_dto_1 = require("../../dto/updateUsuario.dto");
const pagination_with_denominacion_dto_1 = require("../../../../common/dto/busquedas/pagination-with-denominacion.dto");
const normalize_denominations_search_pipe_1 = require("../../../../common/pipes/normalize-denominations-search.pipe");
const updateContrasena_dto_1 = require("../../dto/updateContrasena.dto");
const search_usuario_dto_1 = require("../../dto/search-usuario.dto");
let UsuarioController = UsuarioController_1 = class UsuarioController {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger(UsuarioController_1.name);
        this.ENTITY_NAME = 'Usuario';
    }
    findByDenominacionFiltered(paginationDto) {
        const { denominacion = '', skip, take } = paginationDto;
        this.logger.log(`Buscando  ${this.ENTITY_NAME} con denominación: ${denominacion}`);
        return this.service.findBy(denominacion, skip, take);
    }
    findAll(paginationDto) {
        const { skip, take } = paginationDto;
        this.logger.log(`Obteniendo elementos: skip=${skip}, take=${take}`);
        return this.service.findAll(skip, take);
    }
    findOne(id) {
        this.logger.log(`Buscando  ${this.ENTITY_NAME} con ID: ${id}`);
        return this.service.findOne(+id);
    }
    findByMailFiltered(paginationDto) {
        const { denominacion = '', skip, take } = paginationDto;
        this.logger.log(`Buscando usuarios con mail: ${denominacion}`);
        return this.service.findByMailFiltered(denominacion, skip, take);
    }
    async cambiarContrasena(id, dto) {
        await this.service.updateContrasena(id, dto);
        return { message: 'Contraseña actualizada correctamente' };
    }
    update(id, updateDto) {
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
        return this.service.updateDatos(id, updateDto);
    }
    remove(id) {
        this.logger.warn(`Eliminando  ${this.ENTITY_NAME} con ID: ${id}`);
        return this.service.remove(id);
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Get)('search-by'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, common_1.UsePipes)(normalize_denominations_search_pipe_1.NormalizeDenominacionSearchPipe),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_usuario_dto_1.SearchUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "findByDenominacionFiltered", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('Administrador', 'Root', 'Empleado', 'Vendedor', 'Cobrador', 'Repartidor', 'Repositor'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('Administrador', 'Root', 'Empleado', 'Vendedor', 'Cobrador', 'Repartidor', 'Repositor'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, roles_decorator_1.Roles)('Administrador', 'Root', 'Empleado', 'Vendedor', 'Cobrador', 'Repartidor', 'Repositor'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_with_denominacion_dto_1.PaginationWithDenominacionDto]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "findByMailFiltered", null);
__decorate([
    (0, common_1.Patch)('cambiar-contrasena/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateContrasena_dto_1.UpdateContrasenaDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "cambiarContrasena", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateUsuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('Administrador'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "remove", null);
exports.UsuarioController = UsuarioController = UsuarioController_1 = __decorate([
    (0, common_1.Controller)('usuario'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map