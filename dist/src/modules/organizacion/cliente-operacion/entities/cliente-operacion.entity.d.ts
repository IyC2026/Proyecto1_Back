import { Cliente } from '../../cliente/domain/entities/cliente.entity';
export declare class ClienteOperacion {
    id: number;
    cliente: Cliente;
    operacionId: number;
    tipoOperacion: string;
    creadoEn: Date;
}
