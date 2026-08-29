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
exports.Personal = void 0;
const usuario_entity_1 = require("../../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const domicilio_entity_1 = require("../../../../gutil/domicilio/entities/domicilio.entity");
const cliente_entity_1 = require("../../../cliente/domain/entities/cliente.entity");
const typeorm_1 = require("typeorm");
let Personal = class Personal {
};
exports.Personal = Personal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Personal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Personal.prototype, "denominacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Personal.prototype, "mail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Personal.prototype, "observacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'es_vendedor', default: false }),
    __metadata("design:type", Boolean)
], Personal.prototype, "esVendedor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => domicilio_entity_1.Domicilio, (domicilio) => domicilio.personales, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'domicilio_id' }),
    __metadata("design:type", domicilio_entity_1.Domicilio)
], Personal.prototype, "domicilio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cliente_entity_1.Cliente, (cliente) => cliente.personal),
    __metadata("design:type", Array)
], Personal.prototype, "clientes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Personal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Personal.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], Personal.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_created_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Personal.prototype, "usuarioCreated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_updated_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Personal.prototype, "usuarioUpdated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_deleted_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Personal.prototype, "usuarioDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Personal.prototype, "sistema", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.personal),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Personal.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Personal.prototype, "usuarioId", void 0);
exports.Personal = Personal = __decorate([
    (0, typeorm_1.Entity)('personal')
], Personal);
//# sourceMappingURL=personal.entity.js.map