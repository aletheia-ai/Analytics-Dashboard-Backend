"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookiesOptions = void 0;
exports.cookiesOptions = {
    httpOnly: true,
    sameSite: !process.env.STORE ? 'none' : 'lax',
    secure: !process.env.STORE ? true : false,
    maxAge: 24 * 60 * 60 * 1000,
};
//# sourceMappingURL=cookie-options.js.map