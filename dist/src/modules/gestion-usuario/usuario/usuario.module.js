"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./domain/entities/usuario.entity");
const usuario_service_1 = require("./application/services/usuario.service");
const usuario_persistence_adapters_1 = require("./infraestructure/repositories/usuario-persistence-adapters");
const rol_module_1 = require("../rol/rol.module");
const usuario_controller_1 = require("./application/controllers/usuario.controller");
const normalize_denominations_pipe_1 = require("../../common/pipes/normalize-denominations.pipe");
let UsuarioModule = class UsuarioModule {
};
exports.UsuarioModule = UsuarioModule;
exports.UsuarioModule = UsuarioModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario]),
            rol_module_1.RolModule
        ],
        controllers: [usuario_controller_1.UsuarioController],
        providers: [usuario_service_1.UsuarioService,
            {
                provide: 'IUsuarioRepository',
                useClass: usuario_persistence_adapters_1.UsuarioPersistenceAdapter
            },
            normalize_denominations_pipe_1.NormalizeDenominacionPipe,
        ],
        exports: [
            typeorm_1.TypeOrmModule,
            usuario_service_1.UsuarioService,
            { provide: 'IUsuarioRepository', useClass: usuario_persistence_adapters_1.UsuarioPersistenceAdapter },
        ],
    })
], UsuarioModule);
//# sourceMappingURL=usuario.module.js.map