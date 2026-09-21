import { PartialType } from '@nestjs/swagger';
import { CreateSuperLineaDto } from './create-super-linea.dto';
import { IsOptional, IsInt } from 'class-validator';

export class UpdateSuperLineaDto extends PartialType(CreateSuperLineaDto) {
  @IsOptional()
  @IsInt()
  usuarioUpdatedId?: number;
}
