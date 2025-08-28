"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModal = exports.StoreSchema = void 0;
const mongoose_1 = require("mongoose");
exports.StoreSchema = new mongoose_1.Schema({
    region: { type: mongoose_1.Types.ObjectId, ref: 'Region', required: true },
    name: { type: String, required: true },
    company: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
});
exports.StoreModal = (0, mongoose_1.model)('Store', exports.StoreSchema);
//# sourceMappingURL=store-schema.js.map