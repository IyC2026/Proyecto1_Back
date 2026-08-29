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
exports.Producto = void 0;
const typeorm_1 = require("typeorm");
const linea_entity_1 = require("../../../linea/domain/entities/linea.entity");
const marca_entity_1 = require("../../../marca/domain/entities/marca.entity");
const alicuota_iva_enum_1 = require("../../../../organizacion/enums/alicuota-iva.enum");
const swagger_1 = require("@nestjs/swagger");
const producto_operacion_entity_1 = require("../../../producto-operacion/entities/producto-operacion.entity");
const usuario_entity_1 = require("../../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const monetario_column_decorator_1 = require("../../../../common/decorators/monetario-column.decorator");
const cantidad_column_decorator_1 = require("../../../../common/decorators/cantidad-column.decorator");
const porcentaje_column_decorator_1 = require("../../../../common/decorators/porcentaje-column.decorator");
const proveedor_entity_1 = require("../../../../organizacion/proveedor/domain/entities/proveedor.entity");
let Producto = class Producto {
};
exports.Producto = Producto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Producto.prototype, "denominacion", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Producto.prototype, "codigoProveedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Producto.prototype, "codigoBarra", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proveedor_entity_1.Proveedor, (pro) => pro.proveedoresOperacion, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'proveedor_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", proveedor_entity_1.Proveedor)
], Producto.prototype, "proveedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Producto.prototype, "proveedorId", void 0);
__decorate([
    (0, porcentaje_column_decorator_1.PorcentajeColumn)(21.0),
    __metadata("design:type", Number)
], Producto.prototype, "alicuotaIva", void 0);
__decorate([
    (0, cantidad_column_decorator_1.CantidadColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Producto.prototype, "utilizaStockMinimo", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Producto.prototype, "utilizaStockMinimoPorEmpresa", void 0);
__decorate([
    (0, cantidad_column_decorator_1.CantidadColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "stockMinimo", void 0);
__decorate([
    (0, monetario_column_decorator_1.MonetarioColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "costo", void 0);
__decorate([
    (0, monetario_column_decorator_1.MonetarioColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "costoDolar", void 0);
__decorate([
    (0, monetario_column_decorator_1.MonetarioColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "cotizacionDolar", void 0);
__decorate([
    (0, monetario_column_decorator_1.MonetarioColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "precioDolar", void 0);
__decorate([
    (0, monetario_column_decorator_1.MonetarioColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "precio", void 0);
__decorate([
    (0, porcentaje_column_decorator_1.PorcentajeColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "porcentaje", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Producto.prototype, "fechaCosto", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Producto.prototype, "costoEnDolar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Producto.prototype, "fechaCostoDolar", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Producto.prototype, "destacado", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Producto.prototype, "envioGratis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Producto.prototype, "observacion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Producto.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Producto.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], Producto.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_created_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Producto.prototype, "usuarioCreated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_updated_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Producto.prototype, "usuarioUpdated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_deleted_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Producto.prototype, "usuarioDeleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => linea_entity_1.Linea, (linea) => linea.productos),
    (0, typeorm_1.JoinColumn)({ name: 'linea_id' }),
    __metadata("design:type", linea_entity_1.Linea)
], Producto.prototype, "linea", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Producto.prototype, "lineaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => marca_entity_1.Marca, (marca) => marca.productos),
    (0, typeorm_1.JoinColumn)({ name: 'marca_id' }),
    __metadata("design:type", marca_entity_1.Marca)
], Producto.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Producto.prototype, "marcaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Producto.prototype, "utilizaPack", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Producto.prototype, "cantidadPorPack", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Producto.prototype, "imagen", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Producto.prototype, "ubicacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Producto, (producto) => producto.productosOperacion),
    __metadata("design:type", producto_operacion_entity_1.ProductoOperacion)
], Producto.prototype, "productosOperacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Producto.prototype, "sistema", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Producto.prototype, "codigoReferencia", void 0);
exports.Producto = Producto = __decorate([
    (0, typeorm_1.Entity)('producto')
], Producto);
//# sourceMappingURL=producto.entity.js.map