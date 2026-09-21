import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioService } from 'src/modules/gestion-usuario/usuario/application/services/usuario.service';
import { ensureNotSistemaEntity } from 'src/modules/common/utils/atrituto-sistema';
import { PaginacionUtils } from 'src/modules/common/utils/pagination/paginacion-utils';
import { MessageFrontUtils } from 'src/modules/common/utils/message/message-front.util';
import { IPresentacionRepository } from '../../domain/interfaces/presentacion.repository.interface';
import { CreatePresentacionDto } from '../../dto/create-presentacion.dto';
import { UpdatePresentacionDto } from '../../dto/update-presentacion.dto';
import { PresentacionDto } from '../../dto/presentacion.dto';
import { PresentacionMapper } from '../../mappers/presentacion.mapper';
import { Presentacion } from '../../domain/entities/presentacion.entity';

@Injectable()
export class PresentacionService {
  private readonly logger = new Logger(PresentacionService.name);
  private readonly ENTITY_NAME = 'Presentacion';

  constructor(
    @Inject('IPresentacionRepository')
    private readonly repository: IPresentacionRepository,
    private readonly usuarioService: UsuarioService,
  ) {}

  async create(dto: CreatePresentacionDto) {
    this.logger.log(`Creando una nueva ${this.ENTITY_NAME}: ${dto.denominacion}`);
    await this.checkDenominacionExists(dto.denominacion, 0);

    const entity = await this.repository.create(dto);
    return MessageFrontUtils.createSimple(
      `${this.ENTITY_NAME}`,
      entity.denominacion,
      'creada',
    );
  }

  async update(id: number, dto: UpdatePresentacionDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con ID: ${id}`);
    const presentacion = await this.findEntityById(id);
    ensureNotSistemaEntity(presentacion, 'Presentacion');

    if (dto.denominacion) {
      await this.checkDenominacionExists(dto.denominacion, id);
    }

    const entity = await this.repository.update(id, dto);
    return MessageFrontUtils.createSimple(
      `${this.ENTITY_NAME}`,
      entity.denominacion,
      'editada',
    );
  }

  async findByDenominacionFiltered(
    denominacion: string,
    skip = 0,
    take = 10,
    incluirEliminados: boolean = false,
  ): Promise<{ data: PresentacionDto[]; total: number }> {
    const result = await this.repository.findByDenominacionFiltered(
      denominacion,
      skip,
      take,
      incluirEliminados,
    );
    const data: PresentacionDto[] = result.data.map((item) =>
      PresentacionMapper.toDto(item),
    );
    return {
      data,
      total: PaginacionUtils.totalItems(result.total),
    };
  }

  async findAllListado(): Promise<PresentacionDto[]> {
    const result = await this.repository.findAllListado();
    return result.map((item) => PresentacionMapper.toDto(item));
  }

  async findDtoById(id: number): Promise<PresentacionDto> {
    const entity = await this.findEntityById(id);
    return PresentacionMapper.toDto(entity);
  }

  async findEntityById(id: number): Promise<Presentacion> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrada.`);
    }
    return entity;
  }

  async remove(id: number, usuarioId: number) {
    const entity = await this.findEntityById(id);
    ensureNotSistemaEntity(entity, 'Presentacion');

    const usuario = await this.usuarioService.findOne(usuarioId);
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado.`);
    }

    if (entity.productos && entity.productos.some((p) => !p.deletedAt)) {
      throw new ConflictException(
        'No se puede eliminar la Presentación porque está asociada a productos activos.',
      );
    }

    await this.repository.remove(entity, usuario);
    return MessageFrontUtils.createSimple(
      `${this.ENTITY_NAME}`,
      entity.denominacion,
      'eliminada',
    );
  }

  async findByIdConAuditoria(id: number) {
    const entity = await this.repository.findByIdConAuditoria(id);
    if (!entity) {
      throw new NotFoundException(`${this.ENTITY_NAME} con ID ${id} no encontrada.`);
    }
    return entity;
  }

  private async checkDenominacionExists(denominacion: string, id: number) {
    const normalizada = denominacion.trim().toUpperCase();
    const exists = await this.repository.findByDenominacionWith(normalizada);

    if (exists && exists.id !== id) {
      throw new ConflictException('La denominación ya está en uso o eliminada.');
    }
  }
}
