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
exports.Domicilio = void 0;
const typeorm_1 = require("typeorm");
const localidad_entity_1 = require("../../localidad/domain/entities/localidad.entity");
const personal_entity_1 = require("../../../organizacion/personal/domain/entities/personal.entity");
const cliente_entity_1 = require("../../../organizacion/cliente/domain/entities/cliente.entity");
const proveedor_entity_1 = require("../../../organizacion/proveedor/domain/entities/proveedor.entity");
let Domicilio = class Domicilio {
};
exports.Domicilio = Domicilio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Domicilio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Domicilio.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => localidad_entity_1.Localidad, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'localidad_id' }),
    __metadata("design:type", localidad_entity_1.Localidad)
], Domicilio.prototype, "localidad", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Domicilio.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Domicilio.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Domicilio.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Domicilio.prototype, "usuarioCreatedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Domicilio.prototype, "usuarioUpdatedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Domicilio.prototype, "usuarioDeletedId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cliente_entity_1.Cliente, (cliente) => cliente.domicilio),
    __metadata("design:type", Array)
], Domicilio.prototype, "clientes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proveedor_entity_1.Proveedor, (proveedor) => proveedor.domicilio),
    __metadata("design:type", Array)
], Domicilio.prototype, "proveedores", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => personal_entity_1.Personal, (personal) => personal.domicilio),
    __metadata("design:type", Array)
], Domicilio.prototype, "personales", void 0);
exports.Domicilio = Domicilio = __decorate([
    (0, typeorm_1.Entity)('domicilio')
], Domicilio);
//# sourceMappingURL=domicilio.entity.js.map