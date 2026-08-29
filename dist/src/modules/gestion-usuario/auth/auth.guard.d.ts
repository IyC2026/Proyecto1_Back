import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IUsuarioRepository } from '../usuario/domain/interfaces/usuario-repository.interface';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    private configService;
    private usuarioRepository;
    constructor(jwtService: JwtService, reflector: Reflector, configService: ConfigService, usuarioRepository: IUsuarioRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
