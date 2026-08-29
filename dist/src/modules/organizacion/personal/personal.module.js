"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalModule = void 0;
const common_1 = require("@nestjs/common");
const personal_service_1 = require("./application/services/personal.service");
const personal_controller_1 = require("./application/controllers/personal.controller");
const typeorm_1 = require("@nestjs/typeorm");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
const personal_entity_1 = require("./domain/entities/personal.entity");
const personal_persistence_adapters_1 = require("./infraestructure/repositories/personal.persistence-adapters");
const personal_repository_1 = require("./infraestructure/repositories/personal.repository");
const usuario_module_1 = require("../../gestion-usuario/usuario/usuario.module");
const typeorm_2 = require("typeorm");
const type_orm_unit_of_works1_1 = require("../../common/unit-of-work/type-orm-unit-of-works1");
let PersonalModule = class PersonalModule {
};
exports.PersonalModule = PersonalModule;
exports.PersonalModule = PersonalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([personal_entity_1.Personal]),
            usuario_module_1.UsuarioModule,
        ],
        controllers: [personal_controller_1.PersonalController],
        providers: [
            personal_service_1.PersonalService,
            {
                provide: 'IPersonalRepository',
                useClass: personal_repository_1.PersonalRepository,
            },
            {
                provide: 'UnitOfWork',
                useFactory: (dataSource) => {
                    return new type_orm_unit_of_works1_1.TypeOrmUnitOfWork(dataSource);
                },
                inject: [typeorm_2.DataSource],
            },
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,
            personal_persistence_adapters_1.PersonalPersistenceAdapter,
        ],
        exports: [
            typeorm_1.TypeOrmModule,
            personal_service_1.PersonalService
        ],
    })
], PersonalModule);
//# sourceMappingURL=personal.module.js.map