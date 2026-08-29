import { Usuario } from '../../domain/entities/usuario.entity';
import { RolService } from '../../../rol/application/services/rol.service';
import { IUsuarioRepository } from '../../domain/interfaces/usuario-repository.interface';
import { RegistrarUsuarioDto } from '../../../auth/dto/register.dto';
import { UpdateUsuarioDto } from '../../dto/updateUsuario.dto';
import { Usuario2Dto } from '../../dto/usuario2.dto';
import { UpdateContrasenaDto } from '../../dto/updateContrasena.dto';
import { Personal } from 'src/modules/organizacion/personal/domain/entities/personal.entity';
import { IUnitOfWork } from 'src/modules/common/unit-of-work/iunit-of-work.';
export declare class UsuarioService {
    private readonly repository;
    private readonly rolService;
    private readonly logger;
    constructor(repository: IUsuarioRepository, rolService: RolService);
    private readonly ENTITY_NAME;
    findOne(id: number): Promise<Usuario>;
    findByMail(mail: string): Promise<Usuario | null>;
    checkByMail(mail: string, id: number): Promise<void>;
    findBy(denominacion: string, skip?: number, take?: number): Promise<{
        data: Usuario2Dto[];
        total: number;
    }>;
    findAll(skip?: number, take?: number): Promise<Usuario[]>;
    findAll2(): Promise<{
        data: Usuario2Dto[];
        total: number;
    }>;
    updateDatos(id: number, dto: UpdateUsuarioDto): Promise<void>;
    create(dto: RegistrarUsuarioDto): Promise<Usuario>;
    createUsuarioFor(personal: Personal, uow: IUnitOfWork): Promise<Usuario>;
    remove(id: number): Promise<Usuario>;
    findByMailFiltered(mail: string, skip?: number, take?: number): Promise<Usuario[]>;
    save(usuario: Usuario): Promise<Usuario>;
    updateContrasena(id: number, data: UpdateContrasenaDto): Promise<void>;
}
