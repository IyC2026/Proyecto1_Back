import { CreateClienteOperacionDto } from './dto/create-cliente-operacion.dto';
import { UpdateClienteOperacionDto } from './dto/update-cliente-operacion.dto';
export declare class ClienteOperacionService {
    create(createClienteOperacionDto: CreateClienteOperacionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateClienteOperacionDto: UpdateClienteOperacionDto): string;
    remove(id: number): string;
}
