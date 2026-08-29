"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteModule = void 0;
const common_1 = require("@nestjs/common");
const cliente_service_1 = require("./application/services/cliente.service");
const typeorm_1 = require("@nestjs/typeorm");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
const cliente_persistence_adapters_1 = require("./infraestructure/repositories/cliente.persistence-adapters");
const cliente_repository_1 = require("./infraestructure/repositories/cliente.repository");
const domicilio_module_1 = require("../../gutil/domicilio/domicilio.module");
const localidad_module_1 = require("../../gutil/localidad/localidad.module");
const condicion_iva_module_1 = require("../../gutil/condicion-iva/condicion-iva.module");
const typeorm_2 = require("typeorm");
const type_orm_unit_of_works1_1 = require("../../common/unit-of-work/type-orm-unit-of-works1");
const provincia_module_1 = require("../../gutil/provincia/provincia.module");
const usuario_module_1 = require("../../gestion-usuario/usuario/usuario.module");
const cliente_validation_helper_1 = require("../helpers/cliente-validation-helper");
const condicion_iva_validation_helper_1 = require("../../gutil/condicion-iva/helpers/condicion-iva-validation-helper");
const personal_module_1 = require("../personal/personal.module");
const empresa_module_1 = require("../empresa/empresa.module");
const cliente_entity_1 = require("./domain/entities/cliente.entity");
const cliente_controller_1 = require("./application/controllers/cliente.controller");
let ClienteModule = class ClienteModule {
};
exports.ClienteModule = ClienteModule;
exports.ClienteModule = ClienteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([cliente_entity_1.Cliente]),
            condicion_iva_module_1.CondicionIvaModule,
            localidad_module_1.LocalidadModule,
            provincia_module_1.ProvinciaModule,
            domicilio_module_1.DomicilioModule,
            usuario_module_1.UsuarioModule,
            personal_module_1.PersonalModule,
            empresa_module_1.EmpresaModule,
        ],
        controllers: [cliente_controller_1.ClienteController],
        providers: [
            cliente_service_1.ClienteService,
            cliente_validation_helper_1.ClienteValidationHelper,
            condicion_iva_validation_helper_1.CondicionIvaValidationHelper,
            {
                provide: 'IClienteRepository',
                useClass: cliente_repository_1.ClienteRepository,
            },
            {
                provide: 'UnitOfWork',
                useFactory: (dataSource) => {
                    return new type_orm_unit_of_works1_1.TypeOrmUnitOfWork(dataSource);
                },
                inject: [typeorm_2.DataSource],
            },
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,
            cliente_persistence_adapters_1.ClientePersistenceAdapter,
        ],
        exports: [typeorm_1.TypeOrmModule, cliente_service_1.ClienteService],
    })
], ClienteModule);
//# sourceMappingURL=cliente.module.js.map