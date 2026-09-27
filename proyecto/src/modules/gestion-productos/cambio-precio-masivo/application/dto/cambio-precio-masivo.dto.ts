import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CambioPrecioMasivoDto {
  @ApiProperty({
    type: [Object],
    required: false,
    description: 'Datos legados del cliente; los productos afectados se determinan por alcance en el backend.',
  })
  @IsOptional()
  @IsArray({ message: 'La lista de productos es obligatoria.' })
  items?: unknown[];

  @ApiProperty({ description: 'Tipo de ajuste', enum: ['porcentaje', 'montoFijo'] })
  @IsOptional()
  @IsEnum(['porcentaje', 'montoFijo'], {
    message: 'El tipo de ajuste debe ser porcentaje o montoFijo.',
  })
  tipoAjuste?: 'porcentaje' | 'montoFijo';

  @ApiProperty({ description: 'Porcentaje a aplicar', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El porcentaje debe ser un número.' })
  porcentaje?: number;

  @ApiProperty({ description: 'Monto fijo a sumar o restar', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El monto fijo debe ser un número.' })
  valor?: number;

  @ApiProperty({ description: 'Alcance del ajuste', enum: ['global', 'linea'], required: false })
  @IsOptional()
  @IsEnum(['global', 'linea'], {
    message: 'El alcance debe ser global o linea.',
  })
  alcance?: 'global' | 'linea';

  @ApiProperty({ description: 'ID de línea cuando el ajuste es por línea', required: false })
  @IsOptional()
  @IsInt({ message: 'La línea debe ser un número entero.' })
  lineaId?: number;

  @ApiProperty({ description: 'Usuario que ejecuta el ajuste', required: false })
  @IsOptional()
  @IsInt({ message: 'El usuario debe ser un número entero.' })
  usuarioCreatedId?: number;

  @ApiProperty({ description: 'Usuario que ejecuta el ajuste', required: false })
  @IsOptional()
  @IsInt({ message: 'El usuario debe ser un número entero.' })
  usuarioId?: number;
}
