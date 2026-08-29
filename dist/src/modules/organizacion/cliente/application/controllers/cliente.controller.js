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
var ClienteController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const common_1 = require("@nestjs/common");
const normalize_denominations_pipe_1 = require("../../../../common/pipes/normalize-denominations.pipe");
const auth_guard_1 = require("../../../../gestion-usuario/auth/auth.guard");
const roles_decorator_1 = require("../../../../gestion-usuario/auth/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const listadoConTotalDto_1 = require("../../../../common/interface/listadoConTotalDto");
const operador_dto_1 = require("../../../../gestion-documentos/operador.dto");
const denominacion_empresa_operador_dto_1 = require("../../../../common/dto/denominacion-empresa-operador.dto");
const normalize_denominations_search_pipe_1 = require("../../../../common/pipes/normalize-denominations-search.pipe");
const auditoria_dto_1 = require("../../../../gestion-sistema/auditoria/dto/auditoria.dto");
const denominacion_dto_1 = require("../../../../common/dto/denominacion.dto");
const cliente_service_1 = require("../services/cliente.service");
const create_cliente_dto_1 = require("../../dto/create-cliente.dto");
const update_cliente_dto_1 = require("../../dto/update-cliente.dto");
const denominacion_empresa_operador_usuario_dto_1 = require("../../../../common/dto/denominacion-empresa-operador-usuario.dto");
let ClienteController = ClienteController_1 = class ClienteController {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger(ClienteController_1.name);
        this.ENTITY_NAME = 'Cliente';
    }
    create(createDto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME}...`);
        return this.service.create(createDto);
    }
    findByDenominacionFiltered(paginationDto) {
        const { empresaId, denominacion = '', condicionIvaId, poseeSaldo, skip, take, incluirEliminados, } = paginationDto;
        this.logger.log(`Buscando usuarios con denominación: ${denominacion}`);
        return this.service.findByDenominacionFiltered(empresaId, denominacion, condicionIvaId, poseeSaldo, skip, take, incluirEliminados);
    }
    findByDenominacionVendedorFiltered(paginationDto) {
        const { empresaId, denominacion = '', condicionIvaId, skip, take, } = paginationDto;
        this.logger.log(`Buscando usuarios con denominación: ${denominacion}`);
        return this.service.findByDenominacionFiltered(empresaId, denominacion, condicionIvaId, false, skip, take);
    }
    findAllCondicionIva() {
        return this.service.findAllCondicionIva();
    }
    findAllByVendedorDenominacion(paginationDto) {
        const { denominacion = '' } = paginationDto;
        this.logger.log(`Buscando usuarios con denominación: ${denominacion}`);
        return this.service.findAllByVendedorDenominacion(denominacion);
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
exports.ClienteController = ClienteController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo cliente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto]),
    __metadata("design:returntype", void 0)
], ClienteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('search-by'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor', 'Cobrador'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar clientes por denominación con paginación' }),
    (0, common_1.UsePipes)(normalize_denominations_search_pipe_1.NormalizeDenominacionSearchPipe),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [denominacion_empresa_operador_dto_1.DenominacionEmpresaOperadorDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findByDenominacionFiltered", null);
__decorate([
    (0, common_1.Get)('search-by-vendedor'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar clientes por denominación con paginación' }),
    (0, common_1.UsePipes)(normalize_denominations_search_pipe_1.NormalizeDenominacionSearchPipe),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [denominacion_empresa_operador_usuario_dto_1.DenominacionEmpresaOperadorUsuarioDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findByDenominacionVendedorFiltered", null);
__decorate([
    (0, common_1.Get)('find-all-for-condiciones-iva/select'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor'),
    (0, common_1.UsePipes)(normalize_denominations_search_pipe_1.NormalizeDenominacionSearchPipe),
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
], ClienteController.prototype, "findAllCondicionIva", null);
__decorate([
    (0, common_1.Get)('find-all-for-vendedores/select'),
    (0, common_1.UsePipes)(normalize_denominations_search_pipe_1.NormalizeDenominacionSearchPipe),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor'),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar clientes filtrando por denominación y empresa',
    }),
    (0, swagger_1.ApiQuery)({ name: 'empresaId', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'denominacion', required: false }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Listado de vendedores con total',
        type: listadoConTotalDto_1.ListadoConTotalDto,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [denominacion_dto_1.DenominacionDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findAllByVendedorDenominacion", null);
__decorate([
    (0, common_1.Get)('find-all-for-localidades/select'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor'),
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
], ClienteController.prototype, "findAllLocalidad", null);
__decorate([
    (0, common_1.Get)('find-all-for-localidades-for/:id/select'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor'),
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
], ClienteController.prototype, "findAllLocalidadFor", null);
__decorate([
    (0, common_1.Get)('find-all-for-provincias/select'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor'),
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
], ClienteController.prototype, "findAllProvincia", null);
__decorate([
    (0, common_1.Get)('condicion-iva/:id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "geCondicionIvaDelCliente", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener cliente por ID con saldo para una empresa',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'empresaId', type: Number }),
    (0, swagger_1.ApiOkResponse)({ type: operador_dto_1.OperadorDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('empresaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar cliente por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_cliente_dto_1.UpdateClienteDto]),
    __metadata("design:returntype", void 0)
], ClienteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar cliente por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('usuarioId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ClienteController.prototype, "remove", null);
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
], ClienteController.prototype, "findByIdConAuditoria", null);
exports.ClienteController = ClienteController = ClienteController_1 = __decorate([
    (0, swagger_1.ApiTags)('Organizacion'),
    (0, common_1.Controller)('cliente'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService])
], ClienteController);
//# sourceMappingURL=cliente.controller.js.map