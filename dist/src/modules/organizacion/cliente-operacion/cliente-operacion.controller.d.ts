import { ClienteOperacionService } from './cliente-operacion.service';
import { CreateClienteOperacionDto } from './dto/create-cliente-operacion.dto';
import { UpdateClienteOperacionDto } from './dto/update-cliente-operacion.dto';
export declare class ClienteOperacionController {
    private readonly clienteOperacionService;
    constructor(clienteOperacionService: ClienteOperacionService);
    create(createClienteOperacionDto: CreateClienteOperacionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateClienteOperacionDto: UpdateClienteOperacionDto): string;
    remove(id: string): string;
}
