"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmailSchema = exports.EmailSchema = void 0;
exports.EmailSchema = {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    template: { type: String, required: true },
    context: { type: Object, default: {} },
    attachments: { type: [String], default: [] },
    sentStatus: { type: Boolean, required: true },
    sentAt: { type: Date, default: Date.now },
};
exports.UserEmailSchema = {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    template: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
};
//# sourceMappingURL=email.interface.js.map