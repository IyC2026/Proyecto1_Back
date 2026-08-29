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
exports.Empresa = void 0;
const typeorm_1 = require("typeorm");
const empresa_operacion_entity_1 = require("../../../empresa-operacion/entities/empresa-operacion.entity");
const condicion_iva_entity_1 = require("../../../../gutil/condicion-iva/domain/entities/condicion-iva.entity");
let Empresa = class Empresa {
};
exports.Empresa = Empresa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Empresa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Empresa.prototype, "denominacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15, nullable: true }),
    __metadata("design:type", Object)
], Empresa.prototype, "cuit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => condicion_iva_entity_1.CondicionIva, (condicionIva) => condicionIva.clientes, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'condicion_iva_id' }),
    __metadata("design:type", condicion_iva_entity_1.CondicionIva)
], Empresa.prototype, "condicionIva", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Empresa.prototype, "domicilio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Empresa.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Empresa.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Empresa.prototype, "fechaInicioActividad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Empresa.prototype, "ingresosBrutos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Empresa.prototype, "observacion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Empresa.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Empresa.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Empresa.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Empresa.prototype, "usuarioCreatedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Empresa.prototype, "usuarioDeletedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Empresa.prototype, "usuarioUpdatedId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => empresa_operacion_entity_1.EmpresaOperacion, (emp) => emp.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "empresasOperacion", void 0);
exports.Empresa = Empresa = __decorate([
    (0, typeorm_1.Entity)('empresa')
], Empresa);
//# sourceMappingURL=empresa.entity.js.map