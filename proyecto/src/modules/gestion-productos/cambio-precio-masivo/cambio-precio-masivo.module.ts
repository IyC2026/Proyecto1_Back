import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from '../producto/domain/entities/producto.entity';
import { ProductoPrecioService } from '../producto/application/services/producto-precio.service';
import { CambioPrecioMasivoController } from './application/controllers/cambio-precio-masivo.controller';
import { CambioPrecioMasivoService } from './application/services/cambio-precio-masivo.service';
import { HistorialPrecio } from '../producto/domain/entities/historial-precio.entity';
import { CambioPrecioMasivoRepository } from './infraestructure/repositories/cambio-precio-masivo.repository';
import { CambioPrecioMasivoPersistenceAdapter } from './infraestructure/repositories/cambio-precio-masivo.persistence-adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, HistorialPrecio]),
  ],
  controllers: [CambioPrecioMasivoController],
  providers: [
    CambioPrecioMasivoService,
    ProductoPrecioService,
    CambioPrecioMasivoRepository,
    CambioPrecioMasivoPersistenceAdapter,
    {
      provide: 'ICambioPrecioMasivoRepository',
      useClass: CambioPrecioMasivoRepository,
    },
  ],
  exports: [CambioPrecioMasivoService],
})
export class CambioPrecioMasivoModule {}
