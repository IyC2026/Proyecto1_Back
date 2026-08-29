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
var DomicilioRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomicilioRepository = void 0;
const common_1 = require("@nestjs/common");
const domicilio_persistence_adapters_1 = require("./domicilio.persistence-adapters");
let DomicilioRepository = DomicilioRepository_1 = class DomicilioRepository {
    constructor(persistenceService) {
        this.persistenceService = persistenceService;
        this.logger = new common_1.Logger(DomicilioRepository_1.name);
        this.ENTITY_NAME = 'Domicilio';
    }
};
exports.DomicilioRepository = DomicilioRepository;
exports.DomicilioRepository = DomicilioRepository = DomicilioRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domicilio_persistence_adapters_1.DomicilioPersistenceAdapter])
], DomicilioRepository);
//# sourceMappingURL=domicilio.repository.js.map