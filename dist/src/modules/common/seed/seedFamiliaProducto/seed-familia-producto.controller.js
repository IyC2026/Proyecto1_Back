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
var SeedFamiliaProductoController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedFamiliaProductoController = void 0;
const common_1 = require("@nestjs/common");
const seed_familia_producto_service_1 = require("./seed-familia-producto.service");
let SeedFamiliaProductoController = SeedFamiliaProductoController_1 = class SeedFamiliaProductoController {
    constructor(seedService) {
        this.seedService = seedService;
        this.logger = new common_1.Logger(SeedFamiliaProductoController_1.name);
    }
    executeSeed() {
        this.logger.log('Creando una nseed...');
        return this.seedService.runAllSeeds();
    }
};
exports.SeedFamiliaProductoController = SeedFamiliaProductoController;
__decorate([
    (0, common_1.Get)('execute'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeedFamiliaProductoController.prototype, "executeSeed", null);
exports.SeedFamiliaProductoController = SeedFamiliaProductoController = SeedFamiliaProductoController_1 = __decorate([
    (0, common_1.Controller)('seed-familia-producto'),
    __metadata("design:paramtypes", [seed_familia_producto_service_1.SeedFamiliaProductoService])
], SeedFamiliaProductoController);
//# sourceMappingURL=seed-familia-producto.controller.js.map