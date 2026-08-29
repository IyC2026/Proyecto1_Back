"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let PdfInterceptor = class PdfInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const res = ctx.getResponse();
        return next.handle().pipe((0, rxjs_1.tap)((pdfBuffer) => {
            if (!pdfBuffer)
                return;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=documento.pdf');
            res.setHeader('Content-Length', pdfBuffer.length);
            res.send(pdfBuffer);
        }));
    }
};
exports.PdfInterceptor = PdfInterceptor;
exports.PdfInterceptor = PdfInterceptor = __decorate([
    (0, common_1.Injectable)()
], PdfInterceptor);
//# sourceMappingURL=pdf-interceptor.pipe.js.map