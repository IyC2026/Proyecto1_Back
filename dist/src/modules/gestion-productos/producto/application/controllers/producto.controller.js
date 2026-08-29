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
var ProductoController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoController = void 0;
const common_1 = require("@nestjs/common");
const create_producto_dto_1 = require("../../dto/create-producto.dto");
const update_producto_dto_1 = require("../../dto/update-producto.dto");
const normalize_denominations_pipe_1 = require("../../../../common/pipes/normalize-denominations.pipe");
const auth_guard_1 = require("../../../../gestion-usuario/auth/auth.guard");
const roles_decorator_1 = require("../../../../gestion-usuario/auth/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const normalize_codigo_proveedor_pipe_1 = require("../../../../common/pipes/normalize-codigo-proveedor.pipe");
const search_producto_pagination_with_dto_1 = require("../../dto/search-producto-pagination-with.dto");
const producto_dto_1 = require("../../dto/producto.dto");
const auditoria_dto_1 = require("../../../../gestion-sistema/auditoria/dto/auditoria.dto");
const normalize_denominations_search_pipe_1 = require("../../../../common/pipes/normalize-denominations-search.pipe");
const denominacion_busqueda_dto_1 = require("../../../../common/dto/denominacion-busqueda.dto");
const search_producto_rapido_dto_1 = require("../../dto/search-producto-rapido.dto");
const producto_service_1 = require("../services/producto.service");
let ProductoController = ProductoController_1 = class ProductoController {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger(ProductoController_1.name);
        this.ENTITY_NAME = 'Producto';
    }
    create(createDto) {
        this.logger.log(`Creando un nuevo ${this.ENTITY_NAME}...`);
        return this.service.create(createDto);
    }
    async findAllMarcasFor(dto) {
        const { denominacion = '' } = dto;
        return this.service.findAllForMarcas(denominacion);
    }
    async findAllLineasFor(dto) {
        const { denominacion = '' } = dto;
        return this.service.findAllForLineas(denominacion);
    }
    async searchRapido(dto) {
        const { exacto, codigo, skip, take } = dto;
        return this.service.findByRapido(codigo, exacto, skip, take);
    }
    async search(dto) {
        const { denominacion = '', codProveedorExacto, codigoProveedor, codigoReferencia, marcaId, lineaId, proveedorId, conStock, skip, take, } = dto;
        return this.service.findBy(denominacion, codigoProveedor, codProveedorExacto, codigoReferencia, marcaId, lineaId, proveedorId, conStock, skip, take);
    }
    async getMarcaDelProducto(id) {
        return this.service.buscarMarcaDesdeProducto(id);
    }
    async geLineaDelProducto(id) {
        return this.service.buscarLineaDesdeProducto(id);
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
exports.ProductoController = ProductoController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Repartidor', 'Repositor'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    (0, common_1.UsePipes)(normalize_codigo_proveedor_pipe_1.NormalizeCodigoProveedorPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_producto_dto_1.CreateProductoDto]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('find-all-for-marcas/select'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Repartidor', 'Repositor', 'Vendedor'),
    (0, common_1.UsePipes)(normalize_denominations_search_pipe_1.NormalizeDenominacionSearchPipe),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [denominacion_busqueda_dto_1.DenominacionBusquedaDto]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "findAllMarcasFor", null);
__decorate([
    (0, common_1.Get)('find-all-for-lineas/select'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Repartidor', 'Repositor', 'Vendedor'),
    (0, common_1.UsePipes)(normalize_denominations_search_pipe_1.NormalizeDenominacionSearchPipe),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [denominacion_busqueda_dto_1.DenominacionBusquedaDto]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "findAllLineasFor", null);
__decorate([
    (0, common_1.Get)('search-by-rapido'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor', 'Repartidor', 'Repositor'),
    (0, common_1.UsePipes)(normalize_denominations_search_pipe_1.NormalizeDenominacionSearchPipe),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_producto_rapido_dto_1.SearchProductoRapidoDto]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "searchRapido", null);
__decorate([
    (0, common_1.Get)('search-by'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado', 'Vendedor', 'Repartidor', 'Repositor'),
    (0, common_1.UsePipes)(normalize_denominations_search_pipe_1.NormalizeDenominacionSearchPipe),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_producto_pagination_with_dto_1.SearchProductoPaginationWithDto]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('marca/:id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "getMarcaDelProducto", null);
__decorate([
    (0, common_1.Get)('linea/:id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "geLineaDelProducto", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, swagger_1.ApiOkResponse)({ type: producto_dto_1.ProductoDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    (0, common_1.UsePipes)(normalize_denominations_pipe_1.NormalizeDenominacionPipe),
    (0, common_1.UsePipes)(normalize_codigo_proveedor_pipe_1.NormalizeCodigoProveedorPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_producto_dto_1.UpdateProductoDto]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('Root', 'Administrador', 'Empleado'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('usuarioId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "remove", null);
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
], ProductoController.prototype, "findByIdConAuditoria", null);
exports.ProductoController = ProductoController = ProductoController_1 = __decorate([
    (0, swagger_1.ApiTags)('Gestion Productos'),
    (0, common_1.Controller)('producto'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [producto_service_1.ProductoService])
], ProductoController);
//# sourceMappingURL=producto.controller.js.map