import {
  Body,
  Controller,
  Logger,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/gestion-usuario/auth/auth.guard';
import { Roles } from 'src/modules/gestion-usuario/auth/roles.decorator';
import { Request } from 'express';
import { CambioPrecioMasivoDto } from '../dto/cambio-precio-masivo.dto';
import { CambioPrecioMasivoService } from '../services/cambio-precio-masivo.service';

@ApiTags('Gestion Productos')
@Controller('cambio-precios')
@UseGuards(AuthGuard)
export class CambioPrecioMasivoController {
  private readonly logger = new Logger(CambioPrecioMasivoController.name);

  constructor(
    private readonly service: CambioPrecioMasivoService,
  ) {}

  @Patch('aplicar-cambios')
  @Roles('Root', 'Administrador', 'Empleado')
  async aplicarCambios(@Body() dto: CambioPrecioMasivoDto) {
    this.logger.log('Aplicando cambios masivos de precios');
    return this.service.aplicarCambios(dto);
  }

  @Patch('guardar-cambios')
  @Roles('Root', 'Administrador', 'Empleado')
  async guardarCambios(@Body() dto: CambioPrecioMasivoDto, @Req() request: Request) {
    this.logger.log('Guardando cambios masivos de precios');
    const usuario = request['user'] as { id: number };
    return this.service.guardarCambios({ ...dto, usuarioCreatedId: usuario.id });
  }
}
