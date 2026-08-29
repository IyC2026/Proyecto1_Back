import { Repository, DataSource } from 'typeorm';
import { IUsuarioRepository } from '../../domain/interfaces/usuario-repository.interface';
import { Usuario } from '../../domain/entities/usuario.entity';
import { Rol } from '../../../rol/domain/entities/rol.entity';
import { RegistrarUsuarioDto } from '../../../auth/dto/register.dto';
import { UpdateUsuarioDto } from '../../dto/updateUsuario.dto';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
import { Personal } from 'src/modules/organizacion/personal/domain/entities/personal.entity';
export declare class UsuarioPersistenceAdapter implements IUsuarioRepository {
    private readonly repository;
    private readonly dataSource;
    private readonly logger;
    private readonly ENTITY_NAME;
    constructor(repository: Repository<Usuario>, dataSource: DataSource);
    createUsuarioFor(personal: Personal, uow: IUnitOfWork): Promise<Usuario>;
    findBy(denominacion: string, skip?: number, take?: number): Promise<{
        data: Usuario[];
        total: number;
    }>;
    update(id: number, data: UpdateUsuarioDto, rol: Rol): Promise<Usuario>;
    create(data: RegistrarUsuarioDto, rol: Rol): Promise<Usuario>;
    remove(id: number): Promise<Usuario>;
    save(usuario: Usuario): Promise<Usuario>;
    findOne2(id: number): Promise<Usuario | null>;
    findOne(id: number): Promise<Usuario | null>;
    findAll(skip?: number, take?: number): Promise<Usuario[]>;
    findOneWithRoles(id: number): Promise<Usuario | null>;
    findByMailFiltered(mail: string, skip?: number, take?: number): Promise<Usuario[]>;
    findByMail(mail: string): Promise<Usuario | null>;
    updateContrasena(usuario: Usuario): Promise<Usuario>;
    updateDatos(usuario: Usuario): Promise<Usuario>;
}
