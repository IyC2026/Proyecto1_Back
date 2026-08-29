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
var RolController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolController = void 0;
const common_1 = require("@nestjs/common");
const normalize_denominations_pipe_1 = require("../../../../common/pipes/normalize-denominations.pipe");
const create_rol_dto_1 = require("../../dto/create-rol.dto");
const pagination_dto_1 = require("../../../../common/dto/pagination.dto");
const update_rol_dto_1 = require("../../dto/update-rol.dto");
const auth_guard_1 = require("../../../auth/auth.guard");
const roles_decorator_1 = require("../../../auth/roles.decorator");
const rol_service_1 = require("../services/rol.service");
const pagination_with_denominacion_dto_1 = require("../../../../common/dto/busquedas/pagination-with-denominacion.dto");
let RolController = RolController_1 = class RolController {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger(RolController_1.name);
        this.ENTITY_NAME = 'Rol';
    }
    create(createDto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME}...`);
        return this.service.create(createDto);
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
    findByDenominacionFiltered(paginationDto) {
        const { denominacion = '', skip, take } = paginationDto;
        this.logger.log(`Buscando usuarios con denominación: ${denominacion}`);
        return this.service.findByDenominacionFiltered(denominacion, skip, take);
    }
    update(id, updateDto) {
        this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
        return this.service.update(id, updateDto);
    }
    remove(id) {
        this.logger.warn(`Eliminando  ${this.ENTITY_NAME} con ID: ${id}`);
        return this.service.remove(id);
    }
};
exports.RolController = RolController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Administrador'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rol_dto_1.CreateRolDto]),
    __metadata("design:returntype", void 0)
], RolController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], RolController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('Administrador', 'Empleado', 'Root'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RolController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, roles_decorator_1.Roles)('Administrador', 'Empleado'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_with_denominacion_dto_1.PaginationWithDenominacionDto]),
    __metadata("design:returntype", void 0)
], RolController.prototype, "findByDenominacionFiltered", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('Administrador'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_rol_dto_1.UpdateRolDto]),
    __metadata("design:returntype", void 0)
], RolController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('Administrador'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RolController.prototype, "remove", null);
exports.RolController = RolController = RolController_1 = __decorate([
    (0, common_1.Controller)('rol'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [rol_service_1.RolService])
], RolController);
//# sourceMappingURL=rol.controller.js.map