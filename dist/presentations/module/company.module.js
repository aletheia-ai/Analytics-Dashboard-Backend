"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const company_schema_1 = require("../../infrastructure/modal/company.schema");
const company_service_1 = require("../service/company.service");
const jwt_1 = require("@nestjs/jwt");
const company_controller_1 = require("../controller/company.controller");
const user_module_1 = require("./user.module");
const email_module_1 = require("../../email/email.module");
const verifications_module_1 = require("./verifications.module");
let CompanyModule = class CompanyModule {
};
exports.CompanyModule = CompanyModule;
exports.CompanyModule = CompanyModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Company', schema: company_schema_1.CompanySchema }]), user_module_1.UserModule, jwt_1.JwtModule.registerAsync({
                useFactory: () => ({
                    secret: process.env.JWT_SECRET,
                    signOptions: { expiresIn: '24h' },
                }),
            }), email_module_1.EmailModule, verifications_module_1.UserVerificationModule,],
        providers: [company_service_1.CompanyService],
        controllers: [company_controller_1.CompanyController],
        exports: [mongoose_1.MongooseModule],
    })
], CompanyModule);
//# sourceMappingURL=company.module.js.map