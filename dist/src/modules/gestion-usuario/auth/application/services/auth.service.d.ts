import { RegistrarUsuarioDto } from '../../dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from '../../../usuario/application/services/usuario.service';
import { CambiarContrasenaDto } from '../../dto/cambiar-contrasena.dto';
import { RecuperarPasswordDto } from '../../dto/recuperar-contrasena.dto';
import { VerificarCodigoDto } from '../../dto/verificar-codigo.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly usuarioService;
    private readonly configService;
    constructor(jwtService: JwtService, usuarioService: UsuarioService, configService: ConfigService);
    registrarUsuario(registrarUsuarioDto: RegistrarUsuarioDto): Promise<any>;
    login(loginDto: LoginDto): Promise<any>;
    loginConGoogle(token: string, empresaId: number): Promise<any>;
    enviarCodigoRecuperacion(dto: RecuperarPasswordDto): Promise<{
        mensaje: string;
    }>;
    private enviarCorreoRecuperacion;
    verificarCodigo(dto: VerificarCodigoDto): Promise<boolean>;
    cambiarContrasena(dto: CambiarContrasenaDto): Promise<string>;
}
