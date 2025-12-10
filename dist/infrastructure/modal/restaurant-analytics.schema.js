"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestauranAnalyticsModal = exports.RestaurantAnalyticsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RestaurantAnalyticsSchema = new mongoose_1.Schema({
    store: { type: mongoose_1.Types.ObjectId, ref: 'Store', required: true },
});
exports.RestauranAnalyticsModal = (0, mongoose_1.model)('Restaurant-Analytics', exports.RestaurantAnalyticsSchema, 'restaurant-analytics');
//# sourceMappingURL=restaurant-analytics.schema.js.map