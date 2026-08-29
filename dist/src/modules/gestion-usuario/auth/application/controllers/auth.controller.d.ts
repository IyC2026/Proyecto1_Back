import { AuthService } from '../services/auth.service';
import { RegistrarUsuarioDto } from '../../dto/register.dto';
import { LoginDto } from '../../dto/login.dto';
import { Usuario } from '../../../usuario/domain/entities/usuario.entity';
import { CambiarContrasenaDto } from '../../dto/cambiar-contrasena.dto';
import { RecuperarPasswordDto } from '../../dto/recuperar-contrasena.dto';
import { VerificarCodigoDto } from '../../dto/verificar-codigo.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registrarUsuarioDto: RegistrarUsuarioDto): Promise<Usuario>;
    login(loginDto: LoginDto): Promise<any>;
    loginConGoogle(body: {
        token: string;
        empresaId: number;
    }): Promise<any>;
    recuperarPassword(dto: RecuperarPasswordDto): Promise<{
        mensaje: string;
    }>;
    verificarCodigo(dto: VerificarCodigoDto): Promise<boolean>;
    cambiarContrasena(dto: CambiarContrasenaDto): Promise<string>;
}
