"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
let EmailController = class EmailController {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    async sendTestEmail(body) {
        try {
            const { to, name } = body;
            if (!to || !name) {
                return {
                    success: false,
                    message: 'Email and name are required'
                };
            }
            const testToken = 'test-token-' + Date.now();
            const sent = await this.emailService.sendPasswordResetEmail(to, name, testToken);
            return {
                success: sent,
                message: sent
                    ? 'Test email sent (check console for details)'
                    : 'Failed to send test email'
            };
        }
        catch (error) {
            console.error('Test email error:', error);
            return {
                success: false,
                message: 'Internal server error'
            };
        }
    }
    async triggerPasswordReset(body) {
        try {
            const { email, name } = body;
            if (!email) {
                return {
                    success: false,
                    message: 'Email is required'
                };
            }
            const resetToken = 'reset-token-' + Date.now();
            const sent = await this.emailService.sendPasswordResetEmail(email, name || 'User', resetToken);
            return {
                success: true,
                message: 'If the email exists, a reset link has been sent'
            };
        }
        catch (error) {
            console.error('Password reset email error:', error);
            return {
                success: true,
                message: 'If the email exists, a reset link has been sent'
            };
        }
    }
    async sendCustomEmail(body) {
        try {
            const { to, subject, template, data } = body;
            if (!to || !subject || !template) {
                return {
                    success: false,
                    message: 'To, subject, and template are required'
                };
            }
            return {
                success: true,
                message: 'Email would be sent (check console for details)'
            };
        }
        catch (error) {
            console.error('Custom email error:', error);
            return {
                success: false,
                message: 'Failed to send email'
            };
        }
    }
    healthCheck() {
        return {
            service: 'Email Service',
            status: 'operational',
            timestamp: new Date().toISOString(),
            features: ['password-reset', 'test-emails']
        };
    }
    getStatus() {
        return {
            configured: !!process.env.EMAIL_USER,
            frontendUrl: process.env.FRONTEND_URL || 'Not configured',
            mode: process.env.NODE_ENV || 'development'
        };
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)('test'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendTestEmail", null);
__decorate([
    (0, common_1.Post)('password-reset'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "triggerPasswordReset", null);
__decorate([
    (0, common_1.Post)('send'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendCustomEmail", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "getStatus", null);
exports.EmailController = EmailController = __decorate([
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
//# sourceMappingURL=email.controller.js.map