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
var ProveedorController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorController = void 0;
const common_1 = require("@nestjs/common");
const normalize_denominations_pipe_1 = require("../../../../common/pipes/normalize-denominations.pipe");
const auth_guard_1 = require("../../../../gestion-usuario/auth/auth.guard");
const roles_decorator_1 = require("../../../../gestion-usuario/auth/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const listadoConTotalDto_1 = require("../../../../common/interface/listadoConTotalDto");
const denominacion_empresa_operador_dto_1 = require("../../../../common/dto/denominacion-empresa-operador.dto");
const auditoria_dto_1 = require("../../../../gestion-sistema/auditoria/dto/auditoria.dto");
const normalize_denominations_search_pipe_1 = require("../../../../common/pipes/normalize-denominations-search.pipe");
const proveedor_service_1 = require("../services/proveedor.service");
const create_proveedor_dto_1 = require("../../dto/create-proveedor.dto");
const update_proveedor_dto_1 = require("../../dto/update-proveedor.dto");
const proveedor_dto_1 = require("../../dto/proveedor.dto");
let ProveedorController = ProveedorController_1 = class ProveedorController {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger(ProveedorController_1.name);
        this.ENTITY_NAME = 'Proveedor';
    }
    create(createDto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME}...`);
        return this.service.create(createDto);
    }
    findByDenominacionFiltered(paginationDto) {
        const { empresaId, denominacion = '', condicionIvaId, poseeSaldo, skip, take, incluirEliminados, } = paginationDto;
        this.logger.log(`Buscando usuarios con denominación: ${denominacion}`);
        return this.service.findBy(empresaId, denominacion, condicionIvaId, poseeSaldo, skip, take, incluirEliminados);
    }
    findAllCondicionIva() {
        return this.service.findAllCondicionIva();
    }
    findAllLocalidad() {
        return this.service.findAllLocalidad();
    }
    findAllLocalidadFor(id) {
        return this.service.findAllLocalidadFor(id);
    }
    findAllProvincia() {
        return this.service.findAllProvincia();
    }
    async geCondicionIvaDelCliente(id) {
        return this.service.buscarCondicionIvaDesdeCliente(id);
    }
    findOne(id, empresaId) {
        this.logger.log(`Buscando ${this.ENTITY_NAME} con ID: ${id} para empresa: ${empresaId}`);
        return this.service.findDtoById(id, empresaId);
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
exports.ProveedorController = ProveedorController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo proveedor' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proveedor_dto_1.CreateProveedorDto]),
    __metadata("design:returntype", void 0)
], ProveedorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('search-by'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar proveedores por denominación con paginación',
    }),
    (0, common_1.UsePipes)(normalize_denominations_search_pipe_1.NormalizeDenominacionSearchPipe),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [denominacion_empresa_operador_dto_1.DenominacionEmpresaOperadorDto]),
    __metadata("design:returntype", Promise)
], ProveedorController.prototype, "findByDenominacionFiltered", null);
__decorate([
    (0, common_1.Get)('find-all-for-condiciones-iva/select'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar las condiciones de IVA para combo' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Listado de condiciones de IVA',
        type: listadoConTotalDto_1.ListadoConTotalDto,
    }),
    (0, swagger_1.ApiTags)('Condición IVA'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProveedorController.prototype, "findAllCondicionIva", null);
__decorate([
    (0, common_1.Get)('find-all-for-localidades/select'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar las localidades' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Listado de localidades',
        type: listadoConTotalDto_1.ListadoConTotalDto,
    }),
    (0, swagger_1.ApiTags)('Localidad'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProveedorController.prototype, "findAllLocalidad", null);
__decorate([
    (0, common_1.Get)('find-all-for-localidades-for/:id/select'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar las localidades dada una provincia' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Listado de localidades de una provincia',
        type: listadoConTotalDto_1.ListadoConTotalDto,
    }),
    (0, swagger_1.ApiTags)('Localidad'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProveedorController.prototype, "findAllLocalidadFor", null);
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
], ProveedorController.prototype, "findAllProvincia", null);
__decorate([
    (0, common_1.Get)('condicion-iva/:id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProveedorController.prototype, "geCondicionIvaDelCliente", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener proveedor por ID con saldo para una empresa',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'empresaId', type: Number }),
    (0, swagger_1.ApiOkResponse)({ type: proveedor_dto_1.ProveedorDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('empresaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProveedorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar proveedor por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_proveedor_dto_1.UpdateProveedorDto]),
    __metadata("design:returntype", void 0)
], ProveedorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar cliente por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('usuarioId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProveedorController.prototype, "remove", null);
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
], ProveedorController.prototype, "findByIdConAuditoria", null);
exports.ProveedorController = ProveedorController = ProveedorController_1 = __decorate([
    (0, swagger_1.ApiTags)('Organizacion - Proveedor'),
    (0, common_1.Controller)('proveedor'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [proveedor_service_1.ProveedorService])
], ProveedorController);
//# sourceMappingURL=proveedor.controller.js.map