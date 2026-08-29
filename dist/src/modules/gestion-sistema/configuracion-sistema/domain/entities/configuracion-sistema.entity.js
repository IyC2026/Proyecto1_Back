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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfiguracionSistema = void 0;
const typeorm_1 = require("typeorm");
const empresa_entity_1 = require("../../../../organizacion/empresa/domain/entities/empresa.entity");
const monetario_column_decorator_1 = require("../../../../common/decorators/monetario-column.decorator");
const porcentaje_column_decorator_1 = require("../../../../common/decorators/porcentaje-column.decorator");
let ConfiguracionSistema = class ConfiguracionSistema {
};
exports.ConfiguracionSistema = ConfiguracionSistema;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.empresasOperacion, {
        eager: true,
    }),
    __metadata("design:type", empresa_entity_1.Empresa)
], ConfiguracionSistema.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "caracteresParaBusqueda", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "multiEmpresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "libroCajaUnico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 15 }),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "diasMaximosLibroCaja", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "carteraChequeUnico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "ocultarTotalesDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "visibleSubTotalNoGravado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "visibleSubTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "visibleIva105", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "visibleIva21", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 10 }),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "take", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "busquedaInicial", void 0);
__decorate([
    (0, monetario_column_decorator_1.MonetarioColumn)(),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "maximoDolar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "maxDigitosPorcentajePrecio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "maxDigitosPorcentajePrecioMayorista", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "maxDigitosPrecio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 2 }),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "aniosEmisionMaximoAtras", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 5 }),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "aniosVencimientoMaximoAdelante", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "unidadMedida", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "estadisticasProducto", void 0);
__decorate([
    (0, porcentaje_column_decorator_1.PorcentajeColumn)(),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "porcentajeAumento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "precioConIvaVisible", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "precioOferta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "costoDolar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "facturaElectronica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConfiguracionSistema.prototype, "clientePoseePersonal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ConfiguracionSistema.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ConfiguracionSistema.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], ConfiguracionSistema.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "usuarioCreatedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "usuarioDeletedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "usuarioUpdatedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ConfiguracionSistema.prototype, "sistema", void 0);
exports.ConfiguracionSistema = ConfiguracionSistema = __decorate([
    (0, typeorm_1.Entity)('configuracion_sistema')
], ConfiguracionSistema);
//# sourceMappingURL=configuracion-sistema.entity.js.map