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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatmapStreamListener = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../utils/shared/redis/redis.service");
let HeatmapStreamListener = class HeatmapStreamListener {
    redis;
    lastId = '0';
    constructor(redis) {
        this.redis = redis;
    }
    async onModuleInit() {
        console.log('📥 Heatmap Stream Listener started...');
        this.startListening();
    }
    async startListening() {
        const streamKey = 'heatmap:cam501:minute';
        while (true) {
            try {
                const messages = await this.redis.readStream(streamKey, this.lastId, 0);
                for (const msg of messages) {
                    console.log('🔥 Stream message ID:', msg.id);
                    console.log('Data:', msg.message);
                    this.lastId = msg.id;
                }
            }
            catch (err) {
                console.error('❌ Stream read error:', err);
                await new Promise((r) => setTimeout(r, 1000));
            }
        }
    }
};
exports.HeatmapStreamListener = HeatmapStreamListener;
exports.HeatmapStreamListener = HeatmapStreamListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], HeatmapStreamListener);
//# sourceMappingURL=heatmap-listener.service.js.map