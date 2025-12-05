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
exports.StoreController = void 0;
const common_1 = require("@nestjs/common");
const store_service_1 = require("../service/store.service");
const store_1 = require("../dto/store");
const auth_guard_1 = require("../../utils/guards/auth.guard.");
let StoreController = class StoreController {
    storeService;
    constructor(storeService) {
        this.storeService = storeService;
    }
    async addNewStore(addStoreDto, req) {
        try {
            const result = await this.storeService.addNewStore(addStoreDto, req.user.id);
            console.log("result in controller", result);
            console.log("userid", req.user.id);
            if (result.success) {
                const { stores, store } = result;
                return { message: 'Store Created', stores, store };
            }
            else {
                const { error, errorType } = result;
                if (error === 403) {
                    throw new common_1.ForbiddenException('Cannot create this store');
                }
                else if (error === 404) {
                    if (errorType === 'store') {
                        throw new common_1.NotFoundException('Store Not Found');
                    }
                    if (errorType === 'company') {
                        throw new common_1.NotFoundException('Company Not Registered');
                    }
                    else if (errorType === 'region') {
                        throw new common_1.NotFoundException('Region Not Valid');
                    }
                }
                else if (error === 409) {
                    throw new common_1.ConflictException('Store With this Name Already Exists');
                }
                else {
                    throw new common_1.InternalServerErrorException('Something went wrong');
                }
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async deleteExistingStore(deleteStoreDto, req) {
        try {
            const result = await this.storeService.deleteStore(deleteStoreDto.companyId, req.user.id, deleteStoreDto.storeId);
            if (result.success) {
                return {
                    message: 'Store Deleted Successfully',
                    stores: result.stores.length > 0 ? result.stores : null,
                };
            }
            else {
                const { error, errorType } = result;
                if (error === 403) {
                    throw new common_1.ForbiddenException('Cannot delete this store');
                }
                else if (error === 404) {
                    if (errorType === 'store') {
                        throw new common_1.NotFoundException('Store Not Found');
                    }
                    if (errorType === 'company') {
                        throw new common_1.NotFoundException('Store is not related to specific company');
                    }
                    else if (errorType === 'region') {
                        throw new common_1.NotFoundException('Region Not Valid');
                    }
                }
                else if (error === 409) {
                    throw new common_1.ConflictException('Store With this Name Already Exists');
                }
                else {
                    throw new common_1.InternalServerErrorException('Something went wrong');
                }
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async editExistingStore(EditStoreDto, req) {
        try {
            const { id, ...rest } = EditStoreDto;
            const result = await this.storeService.editExistingStore(rest, req.user.id, id);
            if (result.success) {
                const { stores } = result;
                return { message: 'Store Updated Successfully', stores };
            }
            else {
                const { error, errorType } = result;
                if (error === 403) {
                    throw new common_1.ForbiddenException('Cannot edit this store');
                }
                else if (error === 404) {
                    if (errorType === 'store') {
                        throw new common_1.NotFoundException('Store Not Found');
                    }
                    if (errorType === 'company') {
                        throw new common_1.NotFoundException('Company Not Registered');
                    }
                    else if (errorType === 'region') {
                        throw new common_1.NotFoundException('Region Not Valid');
                    }
                }
                else {
                    throw new common_1.InternalServerErrorException('Something went wrong');
                }
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async getAllStores(getStoresDto) {
        try {
            const result = await this.storeService.getAllStores(getStoresDto.company);
            if (result.success) {
                return { message: result.data };
            }
            else {
                const { error, errorFrom } = result;
                if (error === 403) {
                    throw new common_1.ForbiddenException('Cannot Fetch stores');
                }
                else if (error === 404) {
                    throw new common_1.NotFoundException(`${errorFrom === 'Company' ? 'Company' : 'Store(s)'} 'Not Registered`);
                }
                else {
                    throw new common_1.InternalServerErrorException('Something went wrong');
                }
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
};
exports.StoreController = StoreController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('add'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_1.AddStoreDto, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "addNewStore", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Delete)('delete-store'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_1.DeleteStoreDto, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "deleteExistingStore", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('edit'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_1.EditStoreDto, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "editExistingStore", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('all/:company'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_1.GetStoresDto]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getAllStores", null);
exports.StoreController = StoreController = __decorate([
    (0, common_1.Controller)('store'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
//# sourceMappingURL=store.controller.js.map