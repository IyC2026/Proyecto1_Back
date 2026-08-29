import { IClienteRepository } from '../../domain/interfaces/cliente.interface';
import { CreateClienteDto } from '../../dto/create-cliente.dto';
import { UpdateClienteDto } from '../../dto/update-cliente.dto';
import { Localidad } from 'src/modules/gutil/localidad/domain/entities/localidad.entity';
import { Usuario } from 'src/modules/gestion-usuario/usuario/domain/entities/usuario.entity';
import { Personal } from '../../../personal/domain/entities/personal.entity';
import { ClientePersistenceAdapter } from './cliente.persistence-adapters';
import { Cliente } from '../../domain/entities/cliente.entity';
import { CondicionIva } from 'src/modules/gutil/condicion-iva/domain/entities/condicion-iva.entity';
export declare class ClienteRepository implements IClienteRepository {
    private readonly persistenceService;
    private readonly logger;
    constructor(persistenceService: ClientePersistenceAdapter);
    private readonly ENTITY_NAME;
    create(data: CreateClienteDto, categoriaIVA: CondicionIva, ciudad: Localidad, personal: Personal, usuario: Usuario): Promise<Cliente>;
    update(id: number, data: UpdateClienteDto, categoriaIVA: CondicionIva, localidad: Localidad, personal: Personal, usuario: Usuario): Promise<Cliente>;
    findByIdConAuditoria(id: number): Promise<Cliente | null>;
    findByDenominacionFiltered(denominacion: string, skip?: number, take?: number): Promise<Cliente[]>;
    findBy(denominacion: string, condicionIvaId: number, incluirEliminados: boolean, empresaId?: number, conSaldo?: boolean, skip?: number, take?: number): Promise<{
        data: Cliente[];
        total: number;
    }>;
    findAllByDenominacion(denominacion: string): Promise<Cliente[]>;
    findAllByDenominacionAndCodigo(denominacion: string): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente | null>;
    findOneWithRelations(id: number): Promise<Cliente | null>;
    findByDenominacion(denominacion: string): Promise<Cliente | null>;
    remove(id: number, usuario: Usuario): Promise<Cliente>;
    findByCuit(cuit: string): Promise<Cliente | null>;
    findByDni(dni: string): Promise<Cliente | null>;
}
