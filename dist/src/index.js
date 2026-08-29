"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
const linea_entity_1 = require("./modules/gestion-productos/linea/domain/entities/linea.entity");
const marca_entity_1 = require("./modules/gestion-productos/marca/domain/entities/marca.entity");
const producto_operacion_entity_1 = require("./modules/gestion-productos/producto-operacion/entities/producto-operacion.entity");
const producto_entity_1 = require("./modules/gestion-productos/producto/domain/entities/producto.entity");
const auditoria_entity_1 = require("./modules/gestion-sistema/auditoria/entities/auditoria.entity");
const configuracion_sistema_entity_1 = require("./modules/gestion-sistema/configuracion-sistema/domain/entities/configuracion-sistema.entity");
const rol_entity_1 = require("./modules/gestion-usuario/rol/domain/entities/rol.entity");
const usuario_entity_1 = require("./modules/gestion-usuario/usuario/domain/entities/usuario.entity");
const condicion_iva_entity_1 = require("./modules/gutil/condicion-iva/domain/entities/condicion-iva.entity");
const domicilio_entity_1 = require("./modules/gutil/domicilio/entities/domicilio.entity");
const localidad_entity_1 = require("./modules/gutil/localidad/domain/entities/localidad.entity");
const provincia_entity_1 = require("./modules/gutil/provincia/domain/entities/provincia.entity");
const cliente_entity_1 = require("./modules/organizacion/cliente/domain/entities/cliente.entity");
const empresa_entity_1 = require("./modules/organizacion/empresa/domain/entities/empresa.entity");
const alicuota_iva_enum_1 = require("./modules/organizacion/enums/alicuota-iva.enum");
const personal_entity_1 = require("./modules/organizacion/personal/domain/entities/personal.entity");
const proveedor_entity_1 = require("./modules/organizacion/proveedor/domain/entities/proveedor.entity");
exports.entities = [marca_entity_1.Marca,
    linea_entity_1.Linea,
    producto_entity_1.Producto,
    producto_operacion_entity_1.ProductoOperacion,
    auditoria_entity_1.Auditoria,
    configuracion_sistema_entity_1.ConfiguracionSistema,
    rol_entity_1.Rol,
    usuario_entity_1.Usuario,
    alicuota_iva_enum_1.AlicuotaIva,
    condicion_iva_entity_1.CondicionIva,
    domicilio_entity_1.Domicilio,
    localidad_entity_1.Localidad,
    provincia_entity_1.Provincia,
    usuario_entity_1.Usuario,
    cliente_entity_1.Cliente,
    proveedor_entity_1.Proveedor,
    personal_entity_1.Personal,
    empresa_entity_1.Empresa,
];
//# sourceMappingURL=index.js.map