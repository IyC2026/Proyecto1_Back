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
exports.Cliente = void 0;
const typeorm_1 = require("typeorm");
const domicilio_entity_1 = require("../../../../gutil/domicilio/entities/domicilio.entity");
const usuario_entity_1 = require("../../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const personal_entity_1 = require("../../../personal/domain/entities/personal.entity");
const cliente_operacion_entity_1 = require("../../../cliente-operacion/entities/cliente-operacion.entity");
const condicion_iva_entity_1 = require("../../../../gutil/condicion-iva/domain/entities/condicion-iva.entity");
let Cliente = class Cliente {
};
exports.Cliente = Cliente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cliente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 400 }),
    __metadata("design:type", String)
], Cliente.prototype, "denominacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "denominacionAfip", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 11, nullable: true }),
    __metadata("design:type", Object)
], Cliente.prototype, "cuit", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 11, nullable: true }),
    __metadata("design:type", Object)
], Cliente.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Cliente.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Cliente.prototype, "celular", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Cliente.prototype, "mail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Cliente.prototype, "telefonoAlternativo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Cliente.prototype, "emailAlternativo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Cliente.prototype, "sitioWeb", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Cliente.prototype, "contactoNombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Cliente.prototype, "contactoCargo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => condicion_iva_entity_1.CondicionIva),
    (0, typeorm_1.JoinColumn)({ name: 'condicion_iva_id' }),
    __metadata("design:type", condicion_iva_entity_1.CondicionIva)
], Cliente.prototype, "condicionIva", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'personal_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Cliente.prototype, "personalId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => personal_entity_1.Personal),
    (0, typeorm_1.JoinColumn)({ name: 'personal_id' }),
    __metadata("design:type", personal_entity_1.Personal)
], Cliente.prototype, "personal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => domicilio_entity_1.Domicilio, (domicilio) => domicilio.clientes, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'domicilio_id' }),
    __metadata("design:type", domicilio_entity_1.Domicilio)
], Cliente.prototype, "domicilio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "observacion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Cliente.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Cliente.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], Cliente.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_created_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Cliente.prototype, "usuarioCreated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_updated_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Cliente.prototype, "usuarioUpdated", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_deleted_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Cliente.prototype, "usuarioDeleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cliente_operacion_entity_1.ClienteOperacion, (cli) => cli.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "clientesOperacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Cliente.prototype, "sistema", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ultimo_pedido', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Cliente.prototype, "ultimoPedido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ultimo_factura', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Cliente.prototype, "ultimoFactura", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ultimo_recibo', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Cliente.prototype, "ultimoRecibo", void 0);
exports.Cliente = Cliente = __decorate([
    (0, typeorm_1.Index)(['deletedAt', 'cuit']),
    (0, typeorm_1.Index)(['deletedAt', 'dni']),
    (0, typeorm_1.Index)(['deletedAt', 'codigo']),
    (0, typeorm_1.Entity)('cliente')
], Cliente);
//# sourceMappingURL=cliente.entity.js.map