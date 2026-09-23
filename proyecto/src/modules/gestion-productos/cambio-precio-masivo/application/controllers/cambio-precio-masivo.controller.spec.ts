import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthGuard } from 'src/modules/gestion-usuario/auth/auth.guard';
import { CambioPrecioMasivoController } from './cambio-precio-masivo.controller';
import { CambioPrecioMasivoService } from '../services/cambio-precio-masivo.service';

describe('CambioPrecioMasivoController (integration)', () => {
  let app: INestApplication;
  const service = {
    aplicarCambios: jest.fn(),
    guardarCambios: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CambioPrecioMasivoController],
      providers: [{ provide: CambioPrecioMasivoService, useValue: service }],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context: any) => {
          context.switchToHttp().getRequest().user = { id: 7 };
          return true;
        },
      })
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    jest.clearAllMocks();
  });

  it('should authenticate, validate, route and attach the authenticated user', async () => {
    service.guardarCambios.mockResolvedValue({
      actualizado: true,
      actualizados: 1,
      mensaje: 'Se actualizaron 1 precios correctamente.',
    });

    await request(app.getHttpServer())
      .patch('/cambio-precios/guardar-cambios')
      .set('Authorization', 'Bearer test-token')
      .send({
        items: [{ id: 1, precioFinal: 110 }],
        usuarioCreatedId: 999,
      })
      .expect(200)
      .expect({
        actualizado: true,
        actualizados: 1,
        mensaje: 'Se actualizaron 1 precios correctamente.',
      });

    expect(service.guardarCambios).toHaveBeenCalledWith({
      items: [{ id: 1, precioFinal: 110 }],
      usuarioCreatedId: 7,
    });
  });
});