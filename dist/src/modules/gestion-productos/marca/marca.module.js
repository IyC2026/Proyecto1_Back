"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarcaModule = void 0;
const common_1 = require("@nestjs/common");
const marca_controller_1 = require("./application/controllers/marca.controller");
const typeorm_1 = require("@nestjs/typeorm");
const marca_entity_1 = require("./domain/entities/marca.entity");
const marca_persistence_adapters_1 = require("./infraestructure/repositories/marca.persistence-adapters");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
const marca_repository_1 = require("./infraestructure/repositories/marca.repository");
const typeorm_2 = require("typeorm");
const type_orm_unit_of_works1_1 = require("../../common/unit-of-work/type-orm-unit-of-works1");
const usuario_module_1 = require("../../gestion-usuario/usuario/usuario.module");
const marca_service_1 = require("./application/services/marca.service");
const politica_eliminacion_marca_service_1 = require("./domain/services/politica-eliminacion-marca.service");
const producto_module_1 = require("../producto/producto.module");
let MarcaModule = class MarcaModule {
};
exports.MarcaModule = MarcaModule;
exports.MarcaModule = MarcaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([marca_entity_1.Marca]),
            usuario_module_1.UsuarioModule,
            (0, common_1.forwardRef)(() => producto_module_1.ProductoModule),
        ],
        controllers: [marca_controller_1.MarcaController],
        providers: [
            marca_service_1.MarcaService,
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,
            marca_persistence_adapters_1.MarcaPersistenceAdapter,
            politica_eliminacion_marca_service_1.PoliticaEliminacionMarca,
            {
                provide: 'IMarcaRepository',
                useClass: marca_repository_1.MarcaRepository,
            },
            {
                provide: 'UnitOfWork',
                useFactory: (dataSource) => {
                    return new type_orm_unit_of_works1_1.TypeOrmUnitOfWork(dataSource);
                },
                inject: [typeorm_2.DataSource],
            },
        ],
        exports: [typeorm_1.TypeOrmModule, marca_service_1.MarcaService],
    })
], MarcaModule);
//# sourceMappingURL=marca.module.js.map