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
exports.SeedFamiliaProductoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const linea_entity_1 = require("../../../gestion-productos/linea/domain/entities/linea.entity");
const marca_entity_1 = require("../../../gestion-productos/marca/domain/entities/marca.entity");
const usuario_entity_1 = require("../../../gestion-usuario/usuario/domain/entities/usuario.entity");
const proveedor_entity_1 = require("../../../organizacion/proveedor/domain/entities/proveedor.entity");
const typeorm_2 = require("typeorm");
let SeedFamiliaProductoService = class SeedFamiliaProductoService {
    constructor(lineaRepository, marcaRepository, proveedorRepository, usuarioRepository) {
        this.lineaRepository = lineaRepository;
        this.marcaRepository = marcaRepository;
        this.proveedorRepository = proveedorRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async seedLineas() {
        const entryData = [
            {
                denominacion: 'Aceites',
                sistema: 0,
                usuarioCreatedId: 1,
            },
            {
                denominacion: 'Aceitunas',
                sistema: 0,
                usuarioCreatedId: 1,
            },
            {
                denominacion: 'Azucar',
                sistema: 0,
                usuarioCreatedId: 1,
            },
            {
                denominacion: 'BOLSAS',
                sistema: 0,
                usuarioCreatedId: 1,
            },
            {
                denominacion: 'Chocolates',
                sistema: 0,
                usuarioCreatedId: 1,
            },
            {
                denominacion: 'HARINAS',
                sistema: 0,
                usuarioCreatedId: 1,
            },
            {
                denominacion: 'MARGARINAS Y GRASAS',
                sistema: 0,
                usuarioCreatedId: 1,
            },
        ];
        for (const data of entryData) {
            const exists = await this.lineaRepository.findOneBy({
                denominacion: data.denominacion.toUpperCase(),
            });
            if (!exists) {
                const usuarioCreated = await this.usuarioRepository.findOneBy({
                    id: data.usuarioCreatedId,
                });
                if (!usuarioCreated) {
                    console.log(`⚠️ No se encontró el usuario "${data.usuarioCreatedId}".`);
                    continue;
                }
                const linea = this.lineaRepository.create({
                    denominacion: data.denominacion.toUpperCase(),
                    sistema: data.sistema,
                    usuarioCreatedId: usuarioCreated.id,
                });
                await this.lineaRepository.save(linea);
                console.log(`✅ Linea "${data.denominacion}" creada.`);
            }
            else {
                console.log(`⚠️ Linea "${data.denominacion}" ya existe.`);
            }
        }
    }
    async seedMarcas() {
        const entryData = [
            { denominacion: 'SIN MARCA', usuarioCreatedId: 1, sistema: 0 },
            { denominacion: 'CAROYENSE', usuarioCreatedId: 1, sistema: 0 },
            { denominacion: 'CIRCE', usuarioCreatedId: 1, sistema: 0 },
        ];
        for (const data of entryData) {
            const exists = await this.marcaRepository.findOneBy({
                denominacion: data.denominacion,
            });
            if (!exists) {
                const usuarioCreated = await this.usuarioRepository.findOneBy({
                    id: data.usuarioCreatedId,
                });
                if (!usuarioCreated) {
                    console.log(`⚠️ No se encontró el usuario "${data.usuarioCreatedId}".`);
                    continue;
                }
                const marca = this.marcaRepository.create({
                    denominacion: data.denominacion.toUpperCase(),
                    usuarioCreatedId: usuarioCreated.id,
                    sistema: data.sistema,
                });
                await this.marcaRepository.save(marca);
                console.log(`✅ Marca "${data.denominacion}" creada.`);
            }
            else {
                console.log(`⚠️ Marca "${data.denominacion}" ya existe.`);
            }
        }
    }
    async runAllSeeds() {
        console.log('🚀 Iniciando todos los seeds...');
        await this.seedLineas();
        await this.seedMarcas();
        console.log('✅ Todos los seeds completados.');
    }
};
exports.SeedFamiliaProductoService = SeedFamiliaProductoService;
exports.SeedFamiliaProductoService = SeedFamiliaProductoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(linea_entity_1.Linea)),
    __param(1, (0, typeorm_1.InjectRepository)(marca_entity_1.Marca)),
    __param(2, (0, typeorm_1.InjectRepository)(proveedor_entity_1.Proveedor)),
    __param(3, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeedFamiliaProductoService);
//# sourceMappingURL=seed-familia-producto.service.js.map