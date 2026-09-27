import { Injectable, Logger } from '@nestjs/common';
import { IPresentacionRepository } from '../../domain/interfaces/presentacion.repository.interface';
import { CreatePresentacionDto } from '../../dto/create-presentacion.dto';
import { Presentacion } from '../../domain/entities/presentacion.entity';
import { UpdatePresentacionDto } from '../../dto/update-presentacion.dto';
import { DatabaseConnectionException } from 'src/modules/common/exceptions/database-connection.exception';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { PresentacionPersistenceAdapter } from './presentacion.persistence-adapter';

@Injectable()
export class PresentacionRepository implements IPresentacionRepository {
  private readonly logger = new Logger(PresentacionRepository.name);
  private readonly ENTITY_NAME = 'Presentacion';

  constructor(private readonly persistenceService: PresentacionPersistenceAdapter) {}

  async create(data: CreatePresentacionDto): Promise<Presentacion> {
    try {
      return await this.persistenceService.create(data);
    } catch (error) {
      throw new DatabaseConnectionException('No se pudo crear la Presentación en la base de datos.');
    }
  }

  async update(id: number, data: UpdatePresentacionDto): Promise<Presentacion> {
    return this.persistenceService.update(id, data);
  }

  async findByDenominacionFiltered(
    denominacion: string,
    skip = 0,
    take = 10,
    incluirEliminados = false,
  ): Promise<{ data: Presentacion[]; total: number }> {
    return this.persistenceService.findByDenominacionFiltered(
      denominacion,
      skip,
      take,
      incluirEliminados,
    );
  }

  async findAllListado(): Promise<Presentacion[]> {
    return this.persistenceService.findAllListado();
  }

  async findOne(id: number): Promise<Presentacion | null> {
    return this.persistenceService.findOne(id);
  }

  async findByDenominacion(denominacion: string): Promise<Presentacion | null> {
    return this.persistenceService.findByDenominacion(denominacion);
  }

  async findByDenominacionWith(denominacion: string): Promise<Presentacion | null> {
    return this.persistenceService.findByDenominacionWith(denominacion);
  }

  async remove(data: Presentacion, usuario: Usuario): Promise<Presentacion> {
    return this.persistenceService.remove(data, usuario);
  }

  async findByIdConAuditoria(id: number): Promise<AuditoriaDto | null> {
    return this.persistenceService.findByIdConAuditoria(id);
  }
}
