"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoModule = void 0;
const common_1 = require("@nestjs/common");
const producto_controller_1 = require("./application/controllers/producto.controller");
const typeorm_1 = require("@nestjs/typeorm");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
const producto_entity_1 = require("./domain/entities/producto.entity");
const producto_repository_1 = require("./infraestructure/repositories/producto.repository");
const linea_module_1 = require("../linea/linea.module");
const marca_module_1 = require("../marca/marca.module");
const type_orm_unit_of_works1_1 = require("../../common/unit-of-work/type-orm-unit-of-works1");
const typeorm_2 = require("typeorm");
const proveedor_module_1 = require("../../organizacion/proveedor/proveedor.module");
const usuario_module_1 = require("../../gestion-usuario/usuario/usuario.module");
const common_module_1 = require("../../common/common.module");
const producto_service_1 = require("./application/services/producto.service");
const producto_persistence_adapters_1 = require("./infraestructure/repositories/producto.persistence-adapters");
const producto_uniqueness_validator_ts_1 = require("./infraestructure/validators/producto-uniqueness.validator.ts");
const producto_related_entities_validator_ts_1 = require("./infraestructure/validators/producto-related-entities.validator.ts");
const producto_validation_service_ts_1 = require("./domain/services/producto-validation.service.ts");
const producto_intrinsic_validation_service_ts_1 = require("./domain/services/producto-intrinsic-validation.service.ts");
const producto_delete_policy_1 = require("./application/policies/producto-delete.policy");
let ProductoModule = class ProductoModule {
};
exports.ProductoModule = ProductoModule;
exports.ProductoModule = ProductoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([producto_entity_1.Producto]),
            common_module_1.CommonModule,
            (0, common_1.forwardRef)(() => linea_module_1.LineaModule),
            (0, common_1.forwardRef)(() => marca_module_1.MarcaModule),
            proveedor_module_1.ProveedorModule,
            usuario_module_1.UsuarioModule,
        ],
        controllers: [producto_controller_1.ProductoController],
        providers: [
            producto_service_1.ProductoService,
            producto_intrinsic_validation_service_ts_1.ProductoIntrinsicValidationService,
            producto_validation_service_ts_1.ProductoValidationService,
            producto_related_entities_validator_ts_1.ProductoRelatedEntitiesValidator,
            producto_uniqueness_validator_ts_1.ProductoUniquenessValidator,
            producto_delete_policy_1.ProductoDeletePolicy,
            {
                provide: 'IProductoRepository',
                useClass: producto_repository_1.ProductoRepository,
            },
            {
                provide: 'UnitOfWork',
                useFactory: (dataSource) => {
                    return new type_orm_unit_of_works1_1.TypeOrmUnitOfWork(dataSource);
                },
                inject: [typeorm_2.DataSource],
            },
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,
            producto_persistence_adapters_1.ProductoPersistenceAdapter,
        ],
        exports: [
            typeorm_1.TypeOrmModule,
            producto_service_1.ProductoService,
            producto_persistence_adapters_1.ProductoPersistenceAdapter,
            'IProductoRepository',
        ],
    })
], ProductoModule);
//# sourceMappingURL=producto.module.js.map