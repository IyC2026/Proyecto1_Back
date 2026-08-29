import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
export declare class AuditoriaQueryHelper {
    static applyJoins<T extends ObjectLiteral>(qb: SelectQueryBuilder<T>, alias: string): SelectQueryBuilder<T>;
    static applySelect<T extends ObjectLiteral>(qb: SelectQueryBuilder<T>, alias: string): SelectQueryBuilder<T>;
    static mapToDto(raw: any, alias: string, etiqueta: string): AuditoriaDto;
}
