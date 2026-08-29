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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorOperacionController = void 0;
const common_1 = require("@nestjs/common");
const proveedor_operacion_service_1 = require("./proveedor-operacion.service");
const create_proveedor_operacion_dto_1 = require("./dto/create-proveedor-operacion.dto");
const update_proveedor_operacion_dto_1 = require("./dto/update-proveedor-operacion.dto");
let ProveedorOperacionController = class ProveedorOperacionController {
    constructor(proveedorOperacionService) {
        this.proveedorOperacionService = proveedorOperacionService;
    }
    create(createProveedorOperacionDto) {
        return this.proveedorOperacionService.create(createProveedorOperacionDto);
    }
    findAll() {
        return this.proveedorOperacionService.findAll();
    }
    findOne(id) {
        return this.proveedorOperacionService.findOne(+id);
    }
    update(id, updateProveedorOperacionDto) {
        return this.proveedorOperacionService.update(+id, updateProveedorOperacionDto);
    }
    remove(id) {
        return this.proveedorOperacionService.remove(+id);
    }
};
exports.ProveedorOperacionController = ProveedorOperacionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proveedor_operacion_dto_1.CreateProveedorOperacionDto]),
    __metadata("design:returntype", void 0)
], ProveedorOperacionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProveedorOperacionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProveedorOperacionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_proveedor_operacion_dto_1.UpdateProveedorOperacionDto]),
    __metadata("design:returntype", void 0)
], ProveedorOperacionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProveedorOperacionController.prototype, "remove", null);
exports.ProveedorOperacionController = ProveedorOperacionController = __decorate([
    (0, common_1.Controller)('proveedor-operacion'),
    __metadata("design:paramtypes", [proveedor_operacion_service_1.ProveedorOperacionService])
], ProveedorOperacionController);
//# sourceMappingURL=proveedor-operacion.controller.js.map