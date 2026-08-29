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
exports.ProductoOperacionController = void 0;
const common_1 = require("@nestjs/common");
const producto_operacion_service_1 = require("./producto-operacion.service");
const create_producto_operacion_dto_1 = require("./dto/create-producto-operacion.dto");
const update_producto_operacion_dto_1 = require("./dto/update-producto-operacion.dto");
let ProductoOperacionController = class ProductoOperacionController {
    constructor(productoOperacionService) {
        this.productoOperacionService = productoOperacionService;
    }
    create(createProductoOperacionDto) {
        return this.productoOperacionService.create(createProductoOperacionDto);
    }
    findAll() {
        return this.productoOperacionService.findAll();
    }
    findOne(id) {
        return this.productoOperacionService.findOne(+id);
    }
    update(id, updateProductoOperacionDto) {
        return this.productoOperacionService.update(+id, updateProductoOperacionDto);
    }
    remove(id) {
        return this.productoOperacionService.remove(+id);
    }
};
exports.ProductoOperacionController = ProductoOperacionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_producto_operacion_dto_1.CreateProductoOperacionDto]),
    __metadata("design:returntype", void 0)
], ProductoOperacionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductoOperacionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductoOperacionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_producto_operacion_dto_1.UpdateProductoOperacionDto]),
    __metadata("design:returntype", void 0)
], ProductoOperacionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductoOperacionController.prototype, "remove", null);
exports.ProductoOperacionController = ProductoOperacionController = __decorate([
    (0, common_1.Controller)('producto-operacion'),
    __metadata("design:paramtypes", [producto_operacion_service_1.ProductoOperacionService])
], ProductoOperacionController);
//# sourceMappingURL=producto-operacion.controller.js.map