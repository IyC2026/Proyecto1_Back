import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../../domain/entities/usuario.entity';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';
import { UpdateUsuarioDto } from '../../dto/updateUsuario.dto';
import { PaginationWithDenominacionDto } from 'src/modules/common/dto/busquedas/pagination-with-denominacion.dto';
import { UpdateContrasenaDto } from '../../dto/updateContrasena.dto';
import { SearchUsuarioDto } from '../../dto/search-usuario.dto';
export declare class UsuarioController {
    private readonly service;
    private readonly logger;
    constructor(service: UsuarioService);
    private readonly ENTITY_NAME;
    findByDenominacionFiltered(paginationDto: SearchUsuarioDto): Promise<{
        data: import("../../dto/usuario2.dto").Usuario2Dto[];
        total: number;
    }>;
    findAll(paginationDto: PaginationDto): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario>;
    findByMailFiltered(paginationDto: PaginationWithDenominacionDto): Promise<Usuario[]>;
    cambiarContrasena(id: number, dto: UpdateContrasenaDto): Promise<{
        message: string;
    }>;
    update(id: number, updateDto: UpdateUsuarioDto): Promise<void>;
    remove(id: number): Promise<Usuario>;
}
