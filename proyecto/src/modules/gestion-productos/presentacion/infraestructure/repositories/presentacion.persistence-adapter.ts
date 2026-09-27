import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseConnectionException } from 'src/modules/common/exceptions/database-connection.exception';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entity-notFound-exceptions';
import { Repository, DataSource } from 'typeorm';
import { CreatePresentacionDto } from '../../dto/create-presentacion.dto';
import { Presentacion } from '../../domain/entities/presentacion.entity';
import { IPresentacionRepository } from '../../domain/interfaces/presentacion.repository.interface';
import { UpdatePresentacionDto } from '../../dto/update-presentacion.dto';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { Transactional } from 'src/modules/common/decorators/transactional.decoratos';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { AuditoriaDto } from 'src/modules/gestion-sistema/auditoria/dto/auditoria.dto';
import { FechaUtils } from 'src/modules/common/utils/date/fecha-utils';
import { QueryBuilderHelper } from 'src/modules/common/query-builders/query-builder-helpers';
import { BasePersistenceAdapter } from 'src/modules/common/persistence/base-persistence.adapter';
import { handleDatabaseError } from 'src/modules/common/query-builders/database-error.helper';

@Injectable()
export class PresentacionPersistenceAdapter
  extends BasePersistenceAdapter<Presentacion>
  implements IPresentacionRepository
{
  private readonly logger = new Logger(PresentacionPersistenceAdapter.name);

  protected readonly ALIAS = 'presentacion';

  constructor(
    @InjectRepository(Presentacion)
    repository: Repository<Presentacion>,
    private readonly dataSource: DataSource,
    @Inject('UnitOfWork') public readonly uow: IUnitOfWork,
  ) {
    super(repository);
  }

  @Transactional()
  async create(data: CreatePresentacionDto): Promise<Presentacion> {
    const repo = this.uow.getRepository(Presentacion);
    try {
      const nuevaEntity = repo.create({
        denominacion: data.denominacion,
        observacion: data.observacion,
        usuarioCreatedId: data.usuarioCreatedId,
      });
      return await repo.save(nuevaEntity);
    } catch (error) {
      this.logger.error(`Error al guardar Presentacion: ${error}`);
      throw new DatabaseConnectionException('Error al guardar en la base de datos.');
    }
  }

  @Transactional()
  async update(id: number, data: UpdatePresentacionDto): Promise<Presentacion> {
    const repo = this.uow.getRepository(Presentacion);
    const entity = await repo.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Presentación con ID ${id} no encontrada`);
    }

    entity.denominacion = data.denominacion ?? entity.denominacion;
    entity.observacion = data.observacion ?? entity.observacion;
    if (data.usuarioUpdatedId) entity.usuarioUpdatedId = data.usuarioUpdatedId;

    return await repo.save(entity);
  }

  async findOne(id: number): Promise<Presentacion | null> {
    try {
      const entity = await this.repository
        .createQueryBuilder('presentacion')
        .where('presentacion.id = :id', { id })
        .andWhere('presentacion.deletedAt IS NULL')
        .getOne();

      if (!entity) {
        throw new EntityNotFoundException('Presentación no encontrada');
      }

      return entity;
    } catch (error) {
      if (error instanceof EntityNotFoundException) throw error;
      throw new DatabaseConnectionException('Error al conectar con la base de datos.');
    }
  }

  async findAllListado(): Promise<Presentacion[]> {
    try {
      const query = this.baseQuery();
      QueryBuilderHelper.applyOrder(query, this.ALIAS, 'denominacion', 'ASC');
      return await query.getMany();
    } catch (error) {
      handleDatabaseError(this.logger, 'findAllListado', error);
    }
  }

  async findByDenominacion(denominacion: string): Promise<Presentacion | null> {
    try {
      return await this.repository
        .createQueryBuilder('presentacion')
        .where('presentacion.denominacion = :denominacion', { denominacion })
        .andWhere('presentacion.deletedAt IS NULL')
        .getOne();
    } catch (error) {
      throw new DatabaseConnectionException('Error al conectar con la base de datos.');
    }
  }

  async findByDenominacionWith(denominacion: string): Promise<Presentacion | null> {
    try {
      const normalizada = denominacion.trim().toUpperCase();
      return await this.repository
        .createQueryBuilder('presentacion')
        .withDeleted()
        .where('UPPER(presentacion.denominacion) = :denominacion', {
          denominacion: normalizada,
        })
        .getOne();
    } catch (error) {
      handleDatabaseError(this.logger, 'findByDenominacionWith', error);
    }
  }

  async findByDenominacionFiltered(
    denominacion: string,
    skip = 0,
    take = 10,
    incluirEliminados = false,
  ): Promise<{ data: Presentacion[]; total: number }> {
    try {
      const query = this.baseQuery(incluirEliminados);

      if (denominacion) {
        query.andWhere(`UPPER(${this.ALIAS}.denominacion) LIKE :denominacion`, {
          denominacion: `%${denominacion.toUpperCase()}%`,
        });
      }

      QueryBuilderHelper.applyOrder(query, this.ALIAS, 'denominacion', 'ASC');
      QueryBuilderHelper.applyPagination(query, skip, take);

      const [data, total] = await query.getManyAndCount();
      return { data, total };
    } catch (error) {
      handleDatabaseError(this.logger, 'findByDenominacionFiltered', error);
    }
  }

  @Transactional()
  async remove(entity: Presentacion, usuario: Usuario): Promise<Presentacion> {
    const repo = this.uow.getRepository(Presentacion);
    entity.deletedAt = new Date();
    entity.usuarioDeletedId = usuario.id;
    return await repo.save(entity);
  }

  async findByIdConAuditoria(id: number): Promise<AuditoriaDto | null> {
    try {
      const raw = await this.repository
        .createQueryBuilder('presentacion')
        .leftJoin('usuario', 'usuarioCreated', 'usuarioCreated.id = presentacion.usuarioCreatedId')
        .leftJoin('usuario', 'usuarioUpdated', 'usuarioUpdated.id = presentacion.usuarioUpdatedId')
        .leftJoin('usuario', 'usuarioDeleted', 'usuarioDeleted.id = presentacion.usuarioDeletedId')
        .addSelect([
          'presentacion.id as presentacion_id',
          'presentacion.denominacion as presentacion_denominacion',
          'presentacion.createdAt as presentacion_createdAt',
          'presentacion.updatedAt as presentacion_updatedAt',
          'presentacion.deletedAt as presentacion_deletedAt',
          'usuarioCreated.denominacion as usuarioCreated_nombre',
          'usuarioUpdated.denominacion as usuarioUpdated_nombre',
          'usuarioDeleted.denominacion as usuarioDeleted_nombre',
        ])
        .where('presentacion.id = :id', { id })
        .getRawOne();

      if (!raw) return null;

      return {
        id: raw.presentacion_id ?? 0,
        detalle: raw.presentacion_denominacion
          ? `Presentación ${raw.presentacion_denominacion}`
          : 'Presentación (sin denominación)',
        createdAt: raw.presentacion_createdAt ? FechaUtils.formatFechaHora(raw.presentacion_createdAt) : '',
        updatedAt: raw.presentacion_updatedAt ? FechaUtils.formatFechaHora(raw.presentacion_updatedAt) : '',
        deletedAt: raw.presentacion_deletedAt ? FechaUtils.formatFechaHora(raw.presentacion_deletedAt) : '',
        usuarioCreated: raw.usuarioCreated_nombre ?? '',
        usuarioUpdated: raw.usuarioUpdated_nombre ?? '',
        usuarioDeleted: raw.usuarioDeleted_nombre ?? '',
      };
    } catch (error) {
      throw new DatabaseConnectionException('Error al conectar con la base de datos.');
    }
  }
}
