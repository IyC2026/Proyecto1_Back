"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineaModule = void 0;
const common_1 = require("@nestjs/common");
const linea_entity_1 = require("./domain/entities/linea.entity");
const typeorm_1 = require("@nestjs/typeorm");
const linea_persistence_adapter_1 = require("./infraestructure/repositories/linea.persistence-adapter");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
const linea_repository_1 = require("./infraestructure/repositories/linea.repository");
const typeorm_2 = require("typeorm");
const type_orm_unit_of_works1_1 = require("../../common/unit-of-work/type-orm-unit-of-works1");
const usuario_module_1 = require("../../gestion-usuario/usuario/usuario.module");
const linea_controller_1 = require("./application/controllers/linea.controller");
const linea_service_1 = require("./application/services/linea.service");
const producto_module_1 = require("../producto/producto.module");
const politica_eliminacion_linea_service_1 = require("./domain/services/politica-eliminacion-linea.service");
let LineaModule = class LineaModule {
};
exports.LineaModule = LineaModule;
exports.LineaModule = LineaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([linea_entity_1.Linea]),
            (0, common_1.forwardRef)(() => producto_module_1.ProductoModule),
            usuario_module_1.UsuarioModule,
        ],
        controllers: [linea_controller_1.LineaController],
        providers: [
            linea_service_1.LineaService,
            politica_eliminacion_linea_service_1.PoliticaEliminacionLinea,
            {
                provide: 'ILineaRepository',
                useClass: linea_repository_1.LineaRepository,
            },
            {
                provide: 'UnitOfWork',
                useFactory: (dataSource) => {
                    return new type_orm_unit_of_works1_1.TypeOrmUnitOfWork(dataSource);
                },
                inject: [typeorm_2.DataSource],
            },
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,
            linea_persistence_adapter_1.LineaPersistenceAdapter,
        ],
        exports: [
            typeorm_1.TypeOrmModule,
            linea_service_1.LineaService,
            linea_persistence_adapter_1.LineaPersistenceAdapter,
            'ILineaRepository',
        ],
    })
], LineaModule);
//# sourceMappingURL=linea.module.js.map