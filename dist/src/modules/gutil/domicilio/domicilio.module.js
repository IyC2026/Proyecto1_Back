"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomicilioModule = void 0;
const common_1 = require("@nestjs/common");
const domicilio_service_1 = require("./domicilio.service");
const domicilio_controller_1 = require("./domicilio.controller");
const typeorm_1 = require("@nestjs/typeorm");
const domicilio_entity_1 = require("./entities/domicilio.entity");
const localidad_module_1 = require("../localidad/localidad.module");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
const domicilio_persistence_adapters_1 = require("./domicilio.persistence-adapters");
let DomicilioModule = class DomicilioModule {
};
exports.DomicilioModule = DomicilioModule;
exports.DomicilioModule = DomicilioModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([domicilio_entity_1.Domicilio]),
            localidad_module_1.LocalidadModule,
        ],
        controllers: [domicilio_controller_1.DomicilioController],
        providers: [domicilio_service_1.DomicilioService,
            {
                provide: 'IDomicilioRepository',
                useClass: domicilio_persistence_adapters_1.DomicilioPersistenceAdapter
            },
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,],
        exports: [
            typeorm_1.TypeOrmModule,
            domicilio_service_1.DomicilioService,
        ],
    })
], DomicilioModule);
//# sourceMappingURL=domicilio.module.js.map