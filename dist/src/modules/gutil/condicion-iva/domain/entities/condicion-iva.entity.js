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
exports.CondicionIva = void 0;
const cliente_entity_1 = require("../../../../organizacion/cliente/domain/entities/cliente.entity");
const proveedor_entity_1 = require("../../../../organizacion/proveedor/domain/entities/proveedor.entity");
const typeorm_1 = require("typeorm");
let CondicionIva = class CondicionIva {
};
exports.CondicionIva = CondicionIva;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CondicionIva.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, }),
    __metadata("design:type", String)
], CondicionIva.prototype, "denominacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CondicionIva.prototype, "letra", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], CondicionIva.prototype, "tipoCondicionIvaReceptor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CondicionIva.prototype, "observacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], CondicionIva.prototype, "requiereCuit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], CondicionIva.prototype, "requiereDocumento", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cliente_entity_1.Cliente, (cliente) => cliente.condicionIva),
    __metadata("design:type", Array)
], CondicionIva.prototype, "clientes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proveedor_entity_1.Proveedor, (proveedor) => proveedor.condicionIva, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], CondicionIva.prototype, "proveedores", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CondicionIva.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CondicionIva.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], CondicionIva.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CondicionIva.prototype, "usuarioCreatedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CondicionIva.prototype, "usuarioDeletedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CondicionIva.prototype, "usuarioUpdatedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], CondicionIva.prototype, "sistema", void 0);
exports.CondicionIva = CondicionIva = __decorate([
    (0, typeorm_1.Entity)('condicion_iva'),
    (0, typeorm_1.Index)(['denominacion', 'deletedAt'], { unique: true })
], CondicionIva);
//# sourceMappingURL=condicion-iva.entity.js.map