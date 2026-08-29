"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorModule = void 0;
const common_1 = require("@nestjs/common");
const proveedor_service_1 = require("./application/services/proveedor.service");
const typeorm_1 = require("@nestjs/typeorm");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
const proveedor_persistence_adapters_1 = require("./infraestructure/repositories/proveedor.persistence-adapters");
const proveedor_repository_1 = require("./infraestructure/repositories/proveedor.repository");
const localidad_module_1 = require("../../gutil/localidad/localidad.module");
const domicilio_module_1 = require("../../gutil/domicilio/domicilio.module");
const condicion_iva_module_1 = require("../../gutil/condicion-iva/condicion-iva.module");
const type_orm_unit_of_works1_1 = require("../../common/unit-of-work/type-orm-unit-of-works1");
const typeorm_2 = require("typeorm");
const usuario_module_1 = require("../../gestion-usuario/usuario/usuario.module");
const provincia_module_1 = require("../../gutil/provincia/provincia.module");
const proveedor_validation_helper_1 = require("../helpers/proveedor-validation-helper");
const condicion_iva_validation_helper_1 = require("../../gutil/condicion-iva/helpers/condicion-iva-validation-helper");
const proveedor_controller_1 = require("./application/controllers/proveedor.controller");
const proveedor_entity_1 = require("./domain/entities/proveedor.entity");
let ProveedorModule = class ProveedorModule {
};
exports.ProveedorModule = ProveedorModule;
exports.ProveedorModule = ProveedorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([proveedor_entity_1.Proveedor]),
            condicion_iva_module_1.CondicionIvaModule,
            localidad_module_1.LocalidadModule,
            provincia_module_1.ProvinciaModule,
            domicilio_module_1.DomicilioModule,
            usuario_module_1.UsuarioModule,
        ],
        controllers: [proveedor_controller_1.ProveedorController],
        providers: [
            proveedor_service_1.ProveedorService,
            proveedor_validation_helper_1.ProveedorValidationHelper,
            condicion_iva_validation_helper_1.CondicionIvaValidationHelper,
            {
                provide: 'IProveedorRepository',
                useClass: proveedor_repository_1.ProveedorRepository,
            },
            {
                provide: 'UnitOfWork',
                useFactory: (dataSource) => {
                    return new type_orm_unit_of_works1_1.TypeOrmUnitOfWork(dataSource);
                },
                inject: [typeorm_2.DataSource],
            },
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,
            proveedor_persistence_adapters_1.ProveedorPersistenceAdapter,
        ],
        exports: [typeorm_1.TypeOrmModule, proveedor_service_1.ProveedorService],
    })
], ProveedorModule);
//# sourceMappingURL=proveedor.module.js.map