import { Presentacion } from '../entities/presentacion.entity';
import { CreatePresentacionDto } from '../../dto/create-presentacion.dto';
import { UpdatePresentacionDto } from '../../dto/update-presentacion.dto';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';

export interface IPresentacionRepository {
  create(data: CreatePresentacionDto): Promise<Presentacion>;
  update(id: number, data: UpdatePresentacionDto): Promise<Presentacion>;
  findOne(id: number): Promise<Presentacion | null>;
  findByDenominacion(denominacion: string): Promise<Presentacion | null>;
  findByDenominacionWith(denominacion: string): Promise<Presentacion | null>;
  findByDenominacionFiltered(
    denominacion: string,
    skip?: number,
    take?: number,
    incluirEliminados?: boolean,
  ): Promise<{ data: Presentacion[]; total: number }>;
  findAllListado(): Promise<Presentacion[]>;
  remove(data: Presentacion, usuario: Usuario): Promise<Presentacion>;
  findByIdConAuditoria(id: number): Promise<AuditoriaDto | null>;
}
