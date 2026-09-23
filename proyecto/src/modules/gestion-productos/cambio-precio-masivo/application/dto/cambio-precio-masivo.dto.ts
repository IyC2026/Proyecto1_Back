import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsEnum, IsInt, IsNumber, IsOptional, ValidateNested } from 'class-validator';

export class CambioPrecioMasivoItemDto {
  @ApiProperty({ description: 'Identificador del producto' })
  @IsInt({ message: 'El id del producto debe ser un número entero.' })
  id: number;

  @ApiProperty({ description: 'Precio actual del producto', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número.' })
  precio?: number;

  @ApiProperty({ description: 'Precio final sugerido', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El precio final debe ser un número.' })
  precioFinal?: number;

  @ApiProperty({ description: 'Precio nuevo para el producto', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El precio nuevo debe ser un número.' })
  precioNuevo?: number;

  @ApiProperty({ description: 'Precio calculado nuevo para el producto', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El precio calculado debe ser un número.' })
  precioOcasionalConIvaNuevo?: number;

  @ApiProperty({ description: 'Precio nuevo mayorista', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El precio mayorista debe ser un número.' })
  precioMayoristaConIvaNuevo?: number;

  @ApiProperty({ description: 'Precio nuevo cliente', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El precio cliente debe ser un número.' })
  precioClienteConIvaNuevo?: number;

  @ApiProperty({ description: 'Precio nuevo oferta', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El precio oferta debe ser un número.' })
  precioOfertaConIvaNuevo?: number;
}

export class CambioPrecioMasivoDto {
  @ApiProperty({ type: [CambioPrecioMasivoItemDto] })
  @IsArray({ message: 'La lista de productos es obligatoria.' })
  @ArrayNotEmpty({ message: 'Debe enviarse al menos un producto.' })
  @ValidateNested({ each: true })
  @Type(() => CambioPrecioMasivoItemDto)
  items: CambioPrecioMasivoItemDto[];

  @ApiProperty({ description: 'Tipo de ajuste', enum: ['porcentaje', 'montoFijo'], required: false })
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
