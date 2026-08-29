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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusquedasController = void 0;
const common_1 = require("@nestjs/common");
const busquedas_service_1 = require("./busquedas.service");
const search_busqueda_generico_dto_1 = require("./dto/search-busqueda-generico.dto");
let BusquedasController = class BusquedasController {
    constructor(service) {
        this.service = service;
    }
    async findBy(paginationDto) {
        const { fechaDesde, fechaHasta, empresaId, operadorId, tipoDocumento, skip, take, } = paginationDto;
        console.log('Parámetros extraídos:', {
            fechaDesde,
            fechaHasta,
            empresaId,
            operadorId,
            tipoDocumento,
            skip,
            take,
        });
        return await this.service.findByFiltered(tipoDocumento, fechaDesde, fechaHasta, empresaId, operadorId, skip, take);
    }
};
exports.BusquedasController = BusquedasController;
__decorate([
    (0, common_1.Get)('search-by'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_busqueda_generico_dto_1.SearchBusquedaGenericoDto]),
    __metadata("design:returntype", Promise)
], BusquedasController.prototype, "findBy", null);
exports.BusquedasController = BusquedasController = __decorate([
    (0, common_1.Controller)('busquedas-genericas'),
    __metadata("design:paramtypes", [busquedas_service_1.BusquedasService])
], BusquedasController);
//# sourceMappingURL=busquedas.controller.js.map