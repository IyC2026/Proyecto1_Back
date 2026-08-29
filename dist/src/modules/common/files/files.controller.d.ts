import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadProducto(file: Express.Multer.File): Express.Multer.File;
}
