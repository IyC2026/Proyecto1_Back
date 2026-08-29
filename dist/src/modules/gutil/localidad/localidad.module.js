"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalidadModule = void 0;
const common_1 = require("@nestjs/common");
const localidad_service_1 = require("./application/services/localidad.service");
const localidad_controller_1 = require("./application/controllers/localidad.controller");
const typeorm_1 = require("@nestjs/typeorm");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
const localidad_entity_1 = require("./domain/entities/localidad.entity");
const localidad_persistence_adapters_1 = require("./infraestructure/repositories/localidad.persistence-adapters");
const provincia_module_1 = require("../provincia/provincia.module");
const typeorm_2 = require("typeorm");
const type_orm_unit_of_works1_1 = require("../../common/unit-of-work/type-orm-unit-of-works1");
let LocalidadModule = class LocalidadModule {
};
exports.LocalidadModule = LocalidadModule;
exports.LocalidadModule = LocalidadModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([localidad_entity_1.Localidad]),
            provincia_module_1.ProvinciaModule,],
        controllers: [localidad_controller_1.LocalidadController],
        providers: [
            localidad_service_1.LocalidadService,
            {
                provide: 'ILocalidadRepository',
                useClass: localidad_persistence_adapters_1.LocalidadPersistenceAdapter,
            },
            {
                provide: 'UnitOfWork',
                useFactory: (dataSource) => {
                    return new type_orm_unit_of_works1_1.TypeOrmUnitOfWork(dataSource);
                },
                inject: [typeorm_2.DataSource],
            },
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,
        ],
        exports: [typeorm_1.TypeOrmModule, localidad_service_1.LocalidadService],
    })
], LocalidadModule);
//# sourceMappingURL=localidad.module.js.map