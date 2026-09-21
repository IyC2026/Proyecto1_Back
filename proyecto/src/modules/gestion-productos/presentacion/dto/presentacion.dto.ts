import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class PresentacionDto {
  @ApiProperty({ example: 1, description: 'ID de la Presentación' })
  @Type(() => Number)
  @IsInt()
  id: number;

  @ApiProperty({ example: '1L', description: 'Formato comercial de la presentación' })
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
