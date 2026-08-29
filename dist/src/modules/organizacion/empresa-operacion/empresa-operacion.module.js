"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaOperacionModule = void 0;
const common_1 = require("@nestjs/common");
const empresa_operacion_service_1 = require("./empresa-operacion.service");
const empresa_operacion_controller_1 = require("./empresa-operacion.controller");
let EmpresaOperacionModule = class EmpresaOperacionModule {
};
exports.EmpresaOperacionModule = EmpresaOperacionModule;
exports.EmpresaOperacionModule = EmpresaOperacionModule = __decorate([
    (0, common_1.Module)({
        controllers: [empresa_operacion_controller_1.EmpresaOperacionController],
        providers: [empresa_operacion_service_1.EmpresaOperacionService],
    })
], EmpresaOperacionModule);
//# sourceMappingURL=empresa-operacion.module.js.map