"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaModule = void 0;
const common_1 = require("@nestjs/common");
const empresa_service_1 = require("./application/services/empresa.service");
const typeorm_1 = require("@nestjs/typeorm");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
const empresa_repository_1 = require("./infraestructure/repositories/empresa.repository");
const empresa_persistence_adapters_1 = require("./infraestructure/repositories/empresa.persistence-adapters");
const empresa_entity_1 = require("./domain/entities/empresa.entity");
const condicion_iva_module_1 = require("../../gutil/condicion-iva/condicion-iva.module");
const empresa_controller_1 = require("./application/controllers/empresa.controller");
let EmpresaModule = class EmpresaModule {
};
exports.EmpresaModule = EmpresaModule;
exports.EmpresaModule = EmpresaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([empresa_entity_1.Empresa]),
            (0, common_1.forwardRef)(() => condicion_iva_module_1.CondicionIvaModule),
        ],
        controllers: [empresa_controller_1.EmpresaController],
        providers: [
            empresa_service_1.EmpresaService,
            {
                provide: 'IEmpresaRepository',
                useClass: empresa_repository_1.EmpresaRepository,
            },
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,
            empresa_persistence_adapters_1.EmpresaPersistenceAdapter,
        ],
        exports: [
            typeorm_1.TypeOrmModule,
            empresa_service_1.EmpresaService,
        ],
    })
], EmpresaModule);
//# sourceMappingURL=empresa.module.js.map