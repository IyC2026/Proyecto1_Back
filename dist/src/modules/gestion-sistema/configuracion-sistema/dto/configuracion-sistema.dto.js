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
exports.ConfiguracionSistemaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ConfiguracionSistemaDto {
}
exports.ConfiguracionSistemaDto = ConfiguracionSistemaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID de la configuración del sistema',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ConfiguracionSistemaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'ID de la empresa relacionada' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ConfiguracionSistemaDto.prototype, "empresaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si se permite precio de oferta',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "ocultarTotalesDocumento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si se permite precio de oferta',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "precioOferta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si se permite precio con iva visible ',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "precioConIvaVisible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        description: 'porcentaje de aumiento del precio, sobre el costo',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ConfiguracionSistemaDto.prototype, "porcentajeAumento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 9999,
        description: 'Límite del código del proveedor',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ConfiguracionSistemaDto.prototype, "caracteresParaBusqueda", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 15,
        description: 'Cuantos elemestos por defualt trae en la busqueda ',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ConfiguracionSistemaDto.prototype, "take", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 9999, description: 'maximo dolar' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ConfiguracionSistemaDto.prototype, "maximoDolar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'cuando abre la pantalla trae o no elementos',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "busquedaInicial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si es libro de caja es unico por empresa',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "libroCajaUnica", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si la cartera de cheque  es unico por empresa',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "carteraChequeUnica", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si es visible subtotal no gravado es visible',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "visibleSubTotalNoGravado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si es visible subtotales visible',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "visibleSubTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si es visible iva 105  visible',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "visibleIva105", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si es visible subtotales visible',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "visibleIva21", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'en producto trae estadisticas´' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "estadisticasProducto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si producto posee unidad medida ',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "unidadMedida", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si producto  visualiza costo en dolares ',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "costoDolar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si la empresa trabaja que al cliente se le asigna al vendedor/personal',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "clientePoseePersonal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si la empresa trabaja con documentos electrónicos',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfiguracionSistemaDto.prototype, "electronica", void 0);
//# sourceMappingURL=configuracion-sistema.dto.js.map