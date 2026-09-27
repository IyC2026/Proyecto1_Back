import { PartialType } from '@nestjs/swagger';
import { CreatePresentacionDto } from './create-presentacion.dto';
import { IsOptional, IsInt } from 'class-validator';

export class UpdatePresentacionDto extends PartialType(CreatePresentacionDto) {
  @IsOptional()
  @IsInt()
  usuarioUpdatedId?: number;
}
