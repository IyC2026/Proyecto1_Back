import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, Matches, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePresentacionDto {
  @ApiProperty({ example: '1L', description: 'Nombre del formato de presentación (ej: 1L, 500ml, Pack x6)' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsString({ message: 'La denominación debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La denominación no puede estar vacía.' })
  @MaxLength(255, { message: 'La denominación no puede superar los 255 caracteres.' })
  @Matches(/^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ\.\-_xX/]+$/, {
    message: 'La denominación contiene caracteres no permitidos.',
  })
  denominacion: string;

  @ApiProperty({ example: 'Botella retornable de 1 litro', required: false })
  @IsOptional()
  @IsString()
  observacion?: string;

  @IsNotEmpty({ message: 'El usuarioCreatedId es obligatorio.' })
  @IsInt({ message: 'El usuarioCreatedId debe ser un número entero.' })
  usuarioCreatedId: number;

  @ApiProperty({ example: null, description: 'Fecha de eliminación', nullable: true })
  @IsOptional()
  deletedAt?: string | null;
}
