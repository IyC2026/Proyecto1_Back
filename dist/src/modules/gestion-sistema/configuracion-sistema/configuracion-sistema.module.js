"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfiguracionSistemaModule = void 0;
const common_1 = require("@nestjs/common");
const configuracion_sistema_controller_1 = require("./application/controllers/configuracion-sistema.controller");
const typeorm_1 = require("@nestjs/typeorm");
const configuracion_sistema_entity_1 = require("./domain/entities/configuracion-sistema.entity");
const typeorm_2 = require("typeorm");
const type_orm_unit_of_works1_1 = require("../../common/unit-of-work/type-orm-unit-of-works1");
const configuracion_sistema_service_1 = require("./application/services/configuracion-sistema.service");
const configuracion_sistema_repository_1 = require("./infraestructure/repositories/configuracion-sistema.repository");
const configuracion_sistema_adapters_1 = require("./infraestructure/repositories/configuracion-sistema-adapters");
let ConfiguracionSistemaModule = class ConfiguracionSistemaModule {
};
exports.ConfiguracionSistemaModule = ConfiguracionSistemaModule;
exports.ConfiguracionSistemaModule = ConfiguracionSistemaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([configuracion_sistema_entity_1.ConfiguracionSistema])],
        controllers: [configuracion_sistema_controller_1.ConfiguracionSistemaController],
        providers: [
            configuracion_sistema_service_1.ConfiguracionSistemaService,
            {
                provide: 'IConfiguracionSistemaRepository',
                useClass: configuracion_sistema_repository_1.ConfiguracionSistemaRepository,
            },
            {
                provide: 'UnitOfWork',
                useFactory: (dataSource) => {
                    return new type_orm_unit_of_works1_1.TypeOrmUnitOfWork(dataSource);
                },
                inject: [typeorm_2.DataSource],
            },
            configuracion_sistema_adapters_1.ConfiguracionSistemaPersistenceAdapter,
        ],
        exports: [typeorm_1.TypeOrmModule, configuracion_sistema_service_1.ConfiguracionSistemaService],
    })
], ConfiguracionSistemaModule);
//# sourceMappingURL=configuracion-sistema.module.js.map