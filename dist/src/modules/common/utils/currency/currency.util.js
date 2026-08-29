"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyUtil = void 0;
class CurrencyUtil {
    static getCurrencyName(codigo) {
        switch (codigo) {
            case 0:
                return 'Pesos';
            case 1:
                return 'Dólar';
            case 2:
                return 'Euro';
            default:
                return 'Desconocido';
        }
    }
    static getCurrencySymbol(codigo) {
        switch (codigo) {
            case 0:
                return '$';
            case 1:
                return 'US$';
            case 2:
                return '€';
            default:
                return '';
        }
    }
}
exports.CurrencyUtil = CurrencyUtil;
//# sourceMappingURL=currency.util.js.map