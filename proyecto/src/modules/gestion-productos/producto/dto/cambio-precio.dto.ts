import { IsNotEmpty, IsNumber, IsString, Min, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CambioPrecioDto {
  @ApiProperty({ description: 'Nuevo precio, debe ser mayor que 0' })
  @IsNumber()
  @Min(0.01, { message: 'El precio debe ser mayor a cero.' })
  precioNuevo: number;

  @ApiProperty({ description: 'Motivo del cambio de precio' })
  @IsString()
  @IsNotEmpty({ message: 'El motivo del cambio no puede quedar vacío.' })
  motivo: string;

  @ApiProperty({ description: 'ID del usuario que realiza la operación' })
  @IsInt()
  @IsNotEmpty()
  usuarioId: number;
}
