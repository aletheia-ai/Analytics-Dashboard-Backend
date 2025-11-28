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
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
let RedisService = class RedisService {
    redisClient;
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    async addToStream(stream, message) {
        const entries = [];
        for (const [key, value] of Object.entries(message)) {
            entries.push(key, typeof value === 'string' ? value : JSON.stringify(value));
        }
        try {
            const id = (await this.redisClient.sendCommand(['XADD', stream, '*', ...entries]));
            console.log('Added ID:', id);
            return id;
        }
        catch (err) {
            console.error('❌ XADD error:', err);
            throw err;
        }
    }
    async readStream(stream, lastId = '$', block = 0) {
        const result = await this.redisClient.sendCommand([
            'XREAD',
            'BLOCK',
            block.toString(),
            'COUNT',
            '100',
            'STREAMS',
            stream,
            lastId,
        ]);
        if (!result)
            return [];
        const messages = [];
        const entriesArray = result;
        if (Array.isArray(entriesArray)) {
            for (const streamEntry of entriesArray) {
                if (!Array.isArray(streamEntry) || streamEntry.length < 2)
                    continue;
                const [, streamMessages] = streamEntry;
                if (!Array.isArray(streamMessages))
                    continue;
                for (const [id, kvArray] of streamMessages) {
                    const message = {};
                    for (let i = 0; i < kvArray.length; i += 2) {
                        const key = kvArray[i];
                        const value = kvArray[i + 1];
                        try {
                            message[key] = JSON.parse(value);
                        }
                        catch {
                            message[key] = value;
                        }
                    }
                    messages.push({ id, message });
                }
            }
        }
        return messages;
    }
    async createConsumerGroup(stream, group) {
        try {
            await this.redisClient.sendCommand(['XGROUP', 'CREATE', stream, group, '$', 'MKSTREAM']);
        }
        catch (err) {
            if (!err.message.includes('BUSYGROUP')) {
                throw err;
            }
        }
    }
    async readStreamGroup(group, consumer, stream, lastId = '>') {
        const result = await this.redisClient.sendCommand([
            'XREADGROUP',
            'GROUP',
            group,
            consumer,
            'BLOCK',
            '0',
            'STREAMS',
            stream,
            lastId,
        ]);
        if (!result)
            return [];
        const messages = [];
        if (Array.isArray(result)) {
            for (const streamEntry of result) {
                if (!Array.isArray(streamEntry) || streamEntry.length < 2)
                    continue;
                const [, entries] = streamEntry;
                if (!Array.isArray(entries))
                    continue;
                for (const entry of entries) {
                    if (!Array.isArray(entry) || entry.length < 2)
                        continue;
                    const [id, kvArray] = entry;
                    const message = {};
                    if (Array.isArray(kvArray)) {
                        for (let i = 0; i < kvArray.length; i += 2) {
                            const key = kvArray[i];
                            const value = kvArray[i + 1];
                            try {
                                message[key] = JSON.parse(value);
                            }
                            catch {
                                message[key] = value;
                            }
                        }
                    }
                    messages.push({ id, message });
                }
            }
        }
        return messages;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [Object])
], RedisService);
//# sourceMappingURL=redis.service.js.map