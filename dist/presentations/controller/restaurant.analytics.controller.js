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
exports.RestaurantAnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const restaurant_analytics_service_1 = require("../service/restaurant-analytics.service");
const restaurant_analytics_1 = require("../dto/restaurant-analytics");
let RestaurantAnalyticsController = class RestaurantAnalyticsController {
    restaurantAnalyticsService;
    constructor(restaurantAnalyticsService) {
        this.restaurantAnalyticsService = restaurantAnalyticsService;
    }
    async addEntry(addEntryDto) {
        try {
            const result = await this.restaurantAnalyticsService.addAnalyticsEntry(addEntryDto);
            if (result.success) {
                return 'hello world';
            }
            else {
                if (result.error === 404) {
                    if (result.errorType === 'other') {
                        throw new common_1.NotFoundException('Not Found');
                    }
                    else {
                        throw new common_1.NotFoundException('Store Not Found');
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
};
exports.RestaurantAnalyticsController = RestaurantAnalyticsController;
__decorate([
    (0, common_1.Post)('add-entry'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [restaurant_analytics_1.AddEntryDto]),
    __metadata("design:returntype", Promise)
], RestaurantAnalyticsController.prototype, "addEntry", null);
exports.RestaurantAnalyticsController = RestaurantAnalyticsController = __decorate([
    (0, common_1.Controller)('restaurant-analytics'),
    __metadata("design:paramtypes", [restaurant_analytics_service_1.RestaurantAnalyticsService])
], RestaurantAnalyticsController);
//# sourceMappingURL=restaurant.analytics.controller.js.map