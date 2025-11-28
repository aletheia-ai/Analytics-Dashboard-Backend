"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
const redis_service_1 = require("./redis.service");
const heatmap_producer_service_1 = require("../../../presentations/service/heatmap-producer.service");
const heatmap_listener_service_1 = require("../../../presentations/service/heatmap-listener.service");
const RedisProvider = {
    provide: 'REDIS_CLIENT',
    useFactory: async () => {
        const client = (0, redis_1.createClient)({
            url: process.env.REDIS_URL,
            socket: {
                reconnectStrategy: (retries) => {
                    const delay = Math.min(retries * 50, 2000);
                    console.log(' 🔁 Redis reconnect attempt #${retries}, retrying in ${delay}ms');
                    return delay;
                },
            },
        });
        console.log('🔍 Connecting to Redis with URL:', process.env.REDIS_URL);
        client.on('connect', () => console.log('✅ Redis connected'));
        client.on('ready', () => console.log('🚀 Redis ready'));
        client.on('reconnecting', () => console.log('🔁 Redis reconnecting...'));
        client.on('end', () => console.warn('❌ Redis connection closed'));
        client.on('error', (err) => {
            console.error('❌ Redis error:', err);
        });
        try {
            await client.connect();
            const pong = await client.ping();
            console.log('📶 Redis PING response:', pong);
        }
        catch (err) {
            console.error('❌ Failed to connect to Redis:', err);
            throw err;
        }
        return client;
    },
};
let RedisModule = class RedisModule {
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = __decorate([
    (0, common_1.Module)({
        providers: [RedisProvider, redis_service_1.RedisService, heatmap_producer_service_1.HeatmapProducerService, heatmap_listener_service_1.HeatmapStreamListener],
        exports: [redis_service_1.RedisService],
    })
], RedisModule);
//# sourceMappingURL=redis.module.js.map