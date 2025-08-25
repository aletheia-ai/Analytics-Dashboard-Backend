"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = exports.StoreSchema = void 0;
const mongoose_1 = require("mongoose");
exports.StoreSchema = new mongoose_1.Schema({
    regionId: { type: Number, required: true },
    name: { type: String, required: true },
    storeId: { type: Number, required: true, unique: true },
    companyId: { type: Number, required: true },
});
exports.Store = (0, mongoose_1.model)('Store', exports.StoreSchema);
//# sourceMappingURL=store-schema.js.map