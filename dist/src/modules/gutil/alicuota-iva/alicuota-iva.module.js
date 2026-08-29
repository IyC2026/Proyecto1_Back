"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlicuotaIvaModule = void 0;
const common_1 = require("@nestjs/common");
const alicuota_iva_controller_1 = require("./application/controllers/alicuota-iva.controller");
const usuario_module_1 = require("../../gestion-usuario/usuario/usuario.module");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
const typeorm_1 = require("@nestjs/typeorm");
const alicuota_iva_entity_1 = require("./domain/entities/alicuota-iva.entity");
const type_orm_unit_of_works_1 = require("../../common/unit-of-work/type-orm-unit-of-works");
const alicuota_iva_persistence_adapters_1 = require("./infraestructure/repositories/alicuota-iva.persistence-adapters");
const alicuota_iva_service_1 = require("./application/services/alicuota-iva.service");
let AlicuotaIvaModule = class AlicuotaIvaModule {
};
exports.AlicuotaIvaModule = AlicuotaIvaModule;
exports.AlicuotaIvaModule = AlicuotaIvaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([alicuota_iva_entity_1.AlicuotaIva]),
            usuario_module_1.UsuarioModule,
        ],
        controllers: [alicuota_iva_controller_1.AlicuotaIvaController],
        providers: [
            alicuota_iva_service_1.AlicuotaIvaService,
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,
            alicuota_iva_persistence_adapters_1.AlicuotaIvaPersistenceAdapter,
            {
                provide: 'IAlicuotaIvaRepository',
                useClass: alicuota_iva_persistence_adapters_1.AlicuotaIvaPersistenceAdapter,
            },
            {
                provide: 'UnitOfWork',
                useClass: type_orm_unit_of_works_1.TypeOrmUnitOfWork,
            },
        ],
        exports: [typeorm_1.TypeOrmModule, alicuota_iva_service_1.AlicuotaIvaService],
    })
], AlicuotaIvaModule);
//# sourceMappingURL=alicuota-iva.module.js.map