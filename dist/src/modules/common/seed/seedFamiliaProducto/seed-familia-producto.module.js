"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedFamiliaProductoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const linea_entity_1 = require("../../../gestion-productos/linea/domain/entities/linea.entity");
const marca_entity_1 = require("../../../gestion-productos/marca/domain/entities/marca.entity");
const seed_familia_producto_service_1 = require("./seed-familia-producto.service");
const seed_familia_producto_controller_1 = require("./seed-familia-producto.controller");
const producto_entity_1 = require("../../../gestion-productos/producto/domain/entities/producto.entity");
const usuario_entity_1 = require("../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const proveedor_entity_1 = require("../../../organizacion/proveedor/domain/entities/proveedor.entity");
let SeedFamiliaProductoModule = class SeedFamiliaProductoModule {
};
exports.SeedFamiliaProductoModule = SeedFamiliaProductoModule;
exports.SeedFamiliaProductoModule = SeedFamiliaProductoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                linea_entity_1.Linea,
                marca_entity_1.Marca,
                producto_entity_1.Producto,
                usuario_entity_1.Usuario,
                proveedor_entity_1.Proveedor,
            ]),
        ],
        controllers: [seed_familia_producto_controller_1.SeedFamiliaProductoController],
        providers: [seed_familia_producto_service_1.SeedFamiliaProductoService],
        exports: [seed_familia_producto_service_1.SeedFamiliaProductoService],
    })
], SeedFamiliaProductoModule);
//# sourceMappingURL=seed-familia-producto.module.js.map