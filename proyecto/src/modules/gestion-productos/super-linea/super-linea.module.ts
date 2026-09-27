import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperLinea } from './domain/entities/super-linea.entity';
import { SuperLineaController } from './application/controllers/super-linea.controller';
import { SuperLineaService } from './application/services/super-linea.service';
import { SuperLineaPersistenceAdapter } from './infraestructure/repositories/super-linea.persistence-adapter';
import { SuperLineaRepository } from './infraestructure/repositories/super-linea.repository';
import { UsuarioModule } from 'src/modules/gestion-usuario/usuario/usuario.module';
import { DataSource } from 'typeorm';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { TypeOrmUnitOfWork } from 'src/modules/common/unit-of-work/type-orm-unit-of-works1';
import { NormalizeDenominacionPipe } from 'src/modules/common/pipes/normalize-denominations.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([SuperLinea]),
    UsuarioModule,
  ],
  controllers: [SuperLineaController],
  providers: [
    SuperLineaService,
    {
      provide: 'ISuperLineaRepository',
      useClass: SuperLineaRepository,
    },
    {
      provide: 'UnitOfWork',
      useFactory: (dataSource: DataSource): IUnitOfWork => {
        return new TypeOrmUnitOfWork(dataSource);
      },
      inject: [DataSource],
    },
    NormalizeDenominacionPipe,
    SuperLineaPersistenceAdapter,
  ],
  exports: [
    TypeOrmModule,
    SuperLineaService,
    SuperLineaPersistenceAdapter,
    'ISuperLineaRepository',
  ],
})
export class SuperLineaModule {}
