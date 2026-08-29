"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorStack = exports.getErrorMessage = void 0;
const getErrorMessage = (error) => error instanceof Error ? error.message : String(error);
exports.getErrorMessage = getErrorMessage;
const getErrorStack = (error) => error instanceof Error ? error.stack : undefined;
exports.getErrorStack = getErrorStack;
//# sourceMappingURL=error.helpers.js.map