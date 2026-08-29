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
exports.Proveedor = void 0;
const typeorm_1 = require("typeorm");
const proveedor_operacion_entity_1 = require("../../../proveedor-operacion/entities/proveedor-operacion.entity");
const domicilio_entity_1 = require("../../../../gutil/domicilio/entities/domicilio.entity");
const usuario_entity_1 = require("../../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const condicion_iva_entity_1 = require("../../../../gutil/condicion-iva/domain/entities/condicion-iva.entity");
let Proveedor = class Proveedor {
};
exports.Proveedor = Proveedor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Proveedor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "codigoProveedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 400 }),
    __metadata("design:type", String)
], Proveedor.prototype, "denominacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "denominacionAfip", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 11, nullable: true }),
    __metadata("design:type", Object)
], Proveedor.prototype, "cuit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => domicilio_entity_1.Domicilio, (domicilio) => domicilio.proveedores, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'domicilio_id' }),
    __metadata("design:type", domicilio_entity_1.Domicilio)
], Proveedor.prototype, "domicilio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "observacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'condicion_iva_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Proveedor.prototype, "condicionIvaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => condicion_iva_entity_1.CondicionIva),
    (0, typeorm_1.JoinColumn)({ name: 'condicion_iva_id' }),
    __metadata("design:type", condicion_iva_entity_1.CondicionIva)
], Proveedor.prototype, "condicionIva", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Proveedor.prototype, "esProveedorMateriaPrima", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Proveedor.prototype, "esProveedorGastos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Proveedor.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Proveedor.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], Proveedor.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_created_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Proveedor.prototype, "usuarioCreated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_updated_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Proveedor.prototype, "usuarioUpdated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_deleted_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Proveedor.prototype, "usuarioDeleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proveedor_operacion_entity_1.ProveedorOperacion, (prov) => prov.proveedor),
    __metadata("design:type", Array)
], Proveedor.prototype, "proveedoresOperacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Proveedor.prototype, "sistema", void 0);
exports.Proveedor = Proveedor = __decorate([
    (0, typeorm_1.Index)(['deletedAt', 'cuit']),
    (0, typeorm_1.Index)(['deletedAt', 'codigoProveedor']),
    (0, typeorm_1.Entity)('proveedor')
], Proveedor);
//# sourceMappingURL=proveedor.entity.js.map