import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentacion } from './domain/entities/presentacion.entity';
import { PresentacionController } from './application/controllers/presentacion.controller';
import { PresentacionService } from './application/services/presentacion.service';
import { PresentacionPersistenceAdapter } from './infraestructure/repositories/presentacion.persistence-adapter';
import { PresentacionRepository } from './infraestructure/repositories/presentacion.repository';
import { UsuarioModule } from 'src/modules/gestion-usuario/usuario/usuario.module';
import { DataSource } from 'typeorm';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { TypeOrmUnitOfWork } from 'src/modules/common/unit-of-work/type-orm-unit-of-works1';
import { NormalizeDenominacionPipe } from 'src/modules/common/pipes/normalize-denominations.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([Presentacion]),
    UsuarioModule,
  ],
  controllers: [PresentacionController],
  providers: [
    PresentacionService,
    {
      provide: 'IPresentacionRepository',
      useClass: PresentacionRepository,
    },
    {
      provide: 'UnitOfWork',
      useFactory: (dataSource: DataSource): IUnitOfWork => {
        return new TypeOrmUnitOfWork(dataSource);
      },
      inject: [DataSource],
    },
    NormalizeDenominacionPipe,
    PresentacionPersistenceAdapter,
  ],
  exports: [
    TypeOrmModule,
    PresentacionService,
    PresentacionPersistenceAdapter,
    'IPresentacionRepository',
  ],
})
export class PresentacionModule {}
