import { SelectQueryBuilder } from "typeorm";
import { Usuario } from "../../domain/entities/usuario.entity";
export declare class UsuarioPolicy {
    static excluirUsuariosSistema(qb: SelectQueryBuilder<Usuario>): void;
}
