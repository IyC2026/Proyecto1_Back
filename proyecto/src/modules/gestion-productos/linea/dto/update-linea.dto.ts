import { PartialType } from '@nestjs/mapped-types';
import { CreateLineaDto } from './create-linea.dto';
import { IsOptional, IsNotEmpty, IsInt, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class UpdateLineaDto extends PartialType(CreateLineaDto) {
    //SUPERLÍNEA--------------------------------
    @ApiProperty({ description: 'ID de la SuperLínea a la que pertenece', example: 1, required: false })
    @IsOptional()
    @IsInt({ message: 'El superLineaId debe ser un número entero.' })
    superLineaId?: number;
    //----------------------------------------


    @IsBoolean()
    utilizaStockMinimo: boolean;

    updatedAt: Date;

    @IsNotEmpty({ message: 'El usuarioCreatedId es obligatorio.' })
    @IsInt({ message: 'El usuarioCreatedId debe ser un número entero.' })
    usuarioUpdatedId: number;
}
