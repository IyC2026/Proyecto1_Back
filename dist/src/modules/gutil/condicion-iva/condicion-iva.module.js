"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CondicionIvaModule = void 0;
const common_1 = require("@nestjs/common");
const condicion_iva_service_1 = require("./application/services/condicion-iva.service");
const condicion_iva_controller_1 = require("./application/controllers/condicion-iva.controller");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
const condicion_iva_repository_1 = require("./infraestructure/repositories/condicion-iva.repository");
const condicion_iva_persistence_adapters_1 = require("./infraestructure/repositories/condicion-iva.persistence-adapters");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const type_orm_unit_of_works1_1 = require("../../common/unit-of-work/type-orm-unit-of-works1");
const condicion_iva_entity_1 = require("./domain/entities/condicion-iva.entity");
let CondicionIvaModule = class CondicionIvaModule {
};
exports.CondicionIvaModule = CondicionIvaModule;
exports.CondicionIvaModule = CondicionIvaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([condicion_iva_entity_1.CondicionIva]),
        ],
        controllers: [condicion_iva_controller_1.CondicionIvaController],
        providers: [
            condicion_iva_service_1.CondicionIvaService,
            {
                provide: 'ICondicionIvaRepository',
                useClass: condicion_iva_repository_1.CondicionIVARepository,
            },
            {
                provide: 'UnitOfWork',
                useFactory: (dataSource) => {
                    return new type_orm_unit_of_works1_1.TypeOrmUnitOfWork(dataSource);
                },
                inject: [typeorm_2.DataSource],
            },
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,
            condicion_iva_persistence_adapters_1.CondicionIvaPersistenceAdapter,
        ],
        exports: [typeorm_1.TypeOrmModule, condicion_iva_service_1.CondicionIvaService],
    })
], CondicionIvaModule);
//# sourceMappingURL=condicion-iva.module.js.map