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
var SeedOrganizacionController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedOrganizacionController = void 0;
const common_1 = require("@nestjs/common");
const seed_organizacion_service_1 = require("./seed-organizacion.service");
let SeedOrganizacionController = SeedOrganizacionController_1 = class SeedOrganizacionController {
    constructor(seedService) {
        this.seedService = seedService;
        this.logger = new common_1.Logger(SeedOrganizacionController_1.name);
    }
    executeSeed() {
        this.logger.log('Creando una nseed...');
        return this.seedService.runAllSeeds();
    }
};
exports.SeedOrganizacionController = SeedOrganizacionController;
__decorate([
    (0, common_1.Get)('execute'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeedOrganizacionController.prototype, "executeSeed", null);
exports.SeedOrganizacionController = SeedOrganizacionController = SeedOrganizacionController_1 = __decorate([
    (0, common_1.Controller)('seed-organizacion'),
    __metadata("design:paramtypes", [seed_organizacion_service_1.SeedOrganizacionService])
], SeedOrganizacionController);
//# sourceMappingURL=seed-organizacion.controller.js.map