"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRelatedEntitiesValidator = void 0;
const common_1 = require("@nestjs/common");
const marca_service_1 = require("../../../marca/application/services/marca.service");
const linea_service_1 = require("../../../linea/application/services/linea.service");
let ProductoRelatedEntitiesValidator = class ProductoRelatedEntitiesValidator {
    constructor(marcaService, lineaService) {
        this.marcaService = marcaService;
        this.lineaService = lineaService;
    }
    async validarYObtenerEntidadesRelacionadas(marcaId, lineaId) {
        let marca, linea;
        [marca, linea] = await Promise.all([
            this.marcaService.findEntityById(marcaId),
            this.lineaService.findEntityById(lineaId),
        ]);
        this.validarEntidadExiste(marca, 'Marca', marcaId);
        this.validarEntidadExiste(linea, 'Línea', lineaId);
        return { marca, linea };
    }
    validarEntidadExiste(entidad, tipo, id) {
        if (!entidad) {
            throw new common_1.NotFoundException(`${tipo} con ID ${id} no encontrada`);
        }
    }
};
exports.ProductoRelatedEntitiesValidator = ProductoRelatedEntitiesValidator;
exports.ProductoRelatedEntitiesValidator = ProductoRelatedEntitiesValidator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [marca_service_1.MarcaService,
        linea_service_1.LineaService])
], ProductoRelatedEntitiesValidator);
//# sourceMappingURL=producto-related-entities.validator.ts.js.map