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
var SeedAllService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedAllService = void 0;
const common_1 = require("@nestjs/common");
const seed_organizacion_service_1 = require("../seed-organizacion/seed-organizacion.service");
const seed_familia_producto_service_1 = require("../seedFamiliaProducto/seed-familia-producto.service");
const seed_usuario_service_1 = require("../seed-usuario/seed-usuario.service");
let SeedAllService = SeedAllService_1 = class SeedAllService {
    constructor(seedUsuarioService, seedOrganizacionService, seedArticuloService) {
        this.seedUsuarioService = seedUsuarioService;
        this.seedOrganizacionService = seedOrganizacionService;
        this.seedArticuloService = seedArticuloService;
        this.logger = new common_1.Logger(SeedAllService_1.name);
    }
    async runAllSeeds() {
        this.logger.log('🚀 Ejecutando todos los seeds...');
        try {
            await this.seedUsuarioService.runAllSeeds();
            await this.seedOrganizacionService.runAllSeeds();
            await this.seedArticuloService.runAllSeeds();
        }
        catch (error) {
            this.logger.error('❌ Error al ejecutar los seeds:', error);
        }
        this.logger.log('✅ Todos los seeds han sido ejecutados.');
    }
};
exports.SeedAllService = SeedAllService;
exports.SeedAllService = SeedAllService = SeedAllService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [seed_usuario_service_1.SeedUsuarioService,
        seed_organizacion_service_1.SeedOrganizacionService,
        seed_familia_producto_service_1.SeedFamiliaProductoService])
], SeedAllService);
//# sourceMappingURL=seed-all.service.js.map