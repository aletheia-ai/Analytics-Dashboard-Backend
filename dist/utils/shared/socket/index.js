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
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let AppGateway = class AppGateway {
    constructor() { }
    server;
    afterInit(server) {
        console.log('client init');
    }
    handleConnection(client, ...args) {
        console.log('connect');
    }
    handleDisconnect(client) {
        console.log('disconnect');
    }
    handleJoinRoom(client, room) {
        client.join(room);
        this.server.to(room).emit('joinedRoom', { room });
    }
    handlePepleStats(payload, userId) {
        this.server.emit('people-stats', payload);
    }
    handleProductStats(payload, userId) {
        this.server.emit('product-stats', payload);
    }
};
exports.AppGateway = AppGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleJoinRoom", null);
exports.AppGateway = AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
        transports: ['websocket'],
    }),
    __metadata("design:paramtypes", [])
], AppGateway);
//# sourceMappingURL=index.js.map