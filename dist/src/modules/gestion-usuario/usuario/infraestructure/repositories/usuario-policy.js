"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioPolicy = void 0;
class UsuarioPolicy {
    static excluirUsuariosSistema(qb) {
        qb.andWhere('usuario.id != :rootId', { rootId: 1 });
    }
}
exports.UsuarioPolicy = UsuarioPolicy;
//# sourceMappingURL=usuario-policy.js.map