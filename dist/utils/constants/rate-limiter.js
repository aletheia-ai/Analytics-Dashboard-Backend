"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
exports.rateLimiter = {
    windowMs: 60 * 60 * 1000,
    max: 1000,
    message: 'Too many requests, please try again after an hour',
    standardHeaders: true,
    legacyHeaders: false,
};
//# sourceMappingURL=rate-limiter.js.map