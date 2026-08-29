import { CreateAlicuotaIvaDto } from './create-alicuota-iva.dto';
declare const UpdateAlicuotaIvaDto_base: import("@nestjs/common").Type<Partial<CreateAlicuotaIvaDto>>;
export declare class UpdateAlicuotaIvaDto extends UpdateAlicuotaIvaDto_base {
    updatedAt: Date;
    usuarioUpdatedId: number;
}
export {};
