"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const marca_module_1 = require("./modules/gestion-productos/marca/marca.module");
const typeorm_1 = require("@nestjs/typeorm");
const linea_module_1 = require("./modules/gestion-productos/linea/linea.module");
const producto_module_1 = require("./modules/gestion-productos/producto/producto.module");
const config_1 = require("@nestjs/config");
const proveedor_module_1 = require("./modules/organizacion/proveedor/proveedor.module");
const personal_module_1 = require("./modules/organizacion/personal/personal.module");
const cliente_module_1 = require("./modules/organizacion/cliente/cliente.module");
const usuario_module_1 = require("./modules/gestion-usuario/usuario/usuario.module");
const seed_familia_producto_module_1 = require("./modules/common/seed/seedFamiliaProducto/seed-familia-producto.module");
const seed_organizacion_module_1 = require("./modules/common/seed/seed-organizacion/seed-organizacion.module");
const auth_module_1 = require("./modules/gestion-usuario/auth/auth.module");
const rol_module_1 = require("./modules/gestion-usuario/rol/rol.module");
const seed_all_module_1 = require("./modules/common/seed/seed-all/seed-all.module");
const seed_usuario_module_1 = require("./modules/common/seed/seed-usuario/seed-usuario.module");
const files_module_1 = require("./modules/common/files/files.module");
const proveedor_operacion_module_1 = require("./modules/organizacion/proveedor-operacion/proveedor-operacion.module");
const domicilio_module_1 = require("./modules/gutil/domicilio/domicilio.module");
const localidad_module_1 = require("./modules/gutil/localidad/localidad.module");
const provincia_module_1 = require("./modules/gutil/provincia/provincia.module");
const configuracion_sistema_module_1 = require("./modules/gestion-sistema/configuracion-sistema/configuracion-sistema.module");
const condicion_iva_module_1 = require("./modules/gutil/condicion-iva/condicion-iva.module");
const empresa_operacion_module_1 = require("./modules/organizacion/empresa-operacion/empresa-operacion.module");
const cliente_operacion_module_1 = require("./modules/organizacion/cliente-operacion/cliente-operacion.module");
const producto_operacion_module_1 = require("./modules/gestion-productos/producto-operacion/producto-operacion.module");
const busquedas_module_1 = require("./modules/gestion-documentos/busquedas/busquedas.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.DB_TYPE || 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '3306', 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                timezone: '-03:00',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false,
                ssl: process.env.DB_SSL === 'true'
                    ? { rejectUnauthorized: false }
                    : undefined,
            }),
            marca_module_1.MarcaModule,
            linea_module_1.LineaModule,
            producto_module_1.ProductoModule,
            condicion_iva_module_1.CondicionIvaModule,
            localidad_module_1.LocalidadModule,
            provincia_module_1.ProvinciaModule,
            cliente_module_1.ClienteModule,
            personal_module_1.PersonalModule,
            proveedor_module_1.ProveedorModule,
            usuario_module_1.UsuarioModule,
            auth_module_1.AuthModule,
            rol_module_1.RolModule,
            seed_familia_producto_module_1.SeedFamiliaProductoModule,
            seed_organizacion_module_1.SeedOrganizacionModule,
            seed_all_module_1.SeedAllModule,
            seed_usuario_module_1.SeedUsuarioModule,
            files_module_1.FilesModule,
            proveedor_operacion_module_1.ProveedorOperacionModule,
            domicilio_module_1.DomicilioModule,
            configuracion_sistema_module_1.ConfiguracionSistemaModule,
            empresa_operacion_module_1.EmpresaOperacionModule,
            cliente_operacion_module_1.ClienteOperacionModule,
            producto_operacion_module_1.ProductoOperacionModule,
            busquedas_module_1.BusquedasModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map