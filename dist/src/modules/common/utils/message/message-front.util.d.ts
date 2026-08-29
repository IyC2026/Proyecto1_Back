import { MensajeDto } from './mensajeDto';
export declare class MessageFrontUtils {
    static create(mensaje: string): MensajeDto;
    static eliminarItem(mensaje: string, total: number): MensajeDto;
    static createdItem(mensaje: string, total: number): MensajeDto;
    static createSimple(nombre: string, denominacion: string, accion: 'creada' | 'editada' | 'eliminada' | 'cerrado'): MensajeDto;
    static createSimple2(nombre: string, numeroDocumento: string, cambioEstado: string): MensajeDto;
    static createActualizacionPrecioMasiva(denominacion: string): MensajeDto;
    static create2(nombre: string): MensajeDto;
}
