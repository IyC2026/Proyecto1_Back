import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class SuperLineaDto {
  @ApiProperty({ example: 1, description: 'ID de la SuperLínea' })
  @Type(() => Number)
  @IsInt()
  id: number;

  @ApiProperty({ example: 'Bebidas', description: 'Denominación de la SuperLínea' })
  @IsString()
  denominacion: string;

  @ApiProperty({ example: '', description: 'Observaciones', required: false })
  @IsString()
  observacion: string;

  @ApiProperty({ example: 0, description: 'Indicador de sistema' })
  @Type(() => Number)
  @IsInt()
  sistema: number;

  @ApiProperty({ example: null, description: 'Fecha de eliminación', nullable: true })
  @IsOptional()
  deletedAt: string | null;
}
