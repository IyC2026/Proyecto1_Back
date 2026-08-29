"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinciaModule = void 0;
const common_1 = require("@nestjs/common");
const provincia_controller_1 = require("./application/controllers/provincia.controller");
const typeorm_1 = require("@nestjs/typeorm");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
const provincia_pesistence_adapter_1 = require("./infraestructure/repositories/provincia.pesistence-adapter");
const typeorm_2 = require("typeorm");
const type_orm_unit_of_works1_1 = require("../../common/unit-of-work/type-orm-unit-of-works1");
const provincia_entity_1 = require("./domain/entities/provincia.entity");
const provincia_service_1 = require("./application/services/provincia.service");
let ProvinciaModule = class ProvinciaModule {
};
exports.ProvinciaModule = ProvinciaModule;
exports.ProvinciaModule = ProvinciaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([provincia_entity_1.Provincia])],
        controllers: [provincia_controller_1.ProvinciaController],
        providers: [
            provincia_service_1.ProvinciaService,
            {
                provide: 'IProvinciaRepository',
                useClass: provincia_pesistence_adapter_1.ProvinciaPersistenceAdapter,
            },
            {
                provide: 'UnitOfWork',
                useFactory: (dataSource) => {
                    return new type_orm_unit_of_works1_1.TypeOrmUnitOfWork(dataSource);
                },
                inject: [typeorm_2.DataSource],
            },
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,
            provincia_pesistence_adapter_1.ProvinciaPersistenceAdapter,
        ],
        exports: [typeorm_1.TypeOrmModule, provincia_service_1.ProvinciaService],
    })
], ProvinciaModule);
//# sourceMappingURL=provincia.module.js.map