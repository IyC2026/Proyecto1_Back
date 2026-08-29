"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedOrganizacionModule = void 0;
const common_1 = require("@nestjs/common");
const seed_organizacion_service_1 = require("./seed-organizacion.service");
const seed_organizacion_controller_1 = require("./seed-organizacion.controller");
const typeorm_1 = require("@nestjs/typeorm");
const empresa_entity_1 = require("../../../organizacion/empresa/domain/entities/empresa.entity");
const usuario_entity_1 = require("../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const provincia_entity_1 = require("../../../gutil/provincia/domain/entities/provincia.entity");
const localidad_entity_1 = require("../../../gutil/localidad/domain/entities/localidad.entity");
const configuracion_sistema_entity_1 = require("../../../gestion-sistema/configuracion-sistema/domain/entities/configuracion-sistema.entity");
const personal_entity_1 = require("../../../organizacion/personal/domain/entities/personal.entity");
const cliente_entity_1 = require("../../../organizacion/cliente/domain/entities/cliente.entity");
const rol_module_1 = require("../../../gestion-usuario/rol/rol.module");
const condicion_iva_entity_1 = require("../../../gutil/condicion-iva/domain/entities/condicion-iva.entity");
const proveedor_entity_1 = require("../../../organizacion/proveedor/domain/entities/proveedor.entity");
const alicuota_iva_entity_1 = require("../../../gutil/alicuota-iva/domain/entities/alicuota-iva.entity");
let SeedOrganizacionModule = class SeedOrganizacionModule {
};
exports.SeedOrganizacionModule = SeedOrganizacionModule;
exports.SeedOrganizacionModule = SeedOrganizacionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([provincia_entity_1.Provincia,
                condicion_iva_entity_1.CondicionIva,
                localidad_entity_1.Localidad,
                empresa_entity_1.Empresa,
                cliente_entity_1.Cliente,
                proveedor_entity_1.Proveedor,
                usuario_entity_1.Usuario,
                configuracion_sistema_entity_1.ConfiguracionSistema,
                personal_entity_1.Personal,
                alicuota_iva_entity_1.AlicuotaIva,
            ]),
            rol_module_1.RolModule,
        ],
        controllers: [seed_organizacion_controller_1.SeedOrganizacionController],
        providers: [seed_organizacion_service_1.SeedOrganizacionService],
        exports: [seed_organizacion_service_1.SeedOrganizacionService],
    })
], SeedOrganizacionModule);
//# sourceMappingURL=seed-organizacion.module.js.map