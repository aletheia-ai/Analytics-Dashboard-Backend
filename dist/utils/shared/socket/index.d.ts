import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Connection } from 'mongoose';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly connection;
    constructor(connection: Connection);
    private changeStream;
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(client: Socket, room: string): void;
    handlePepleStats(payload: any, userId: string): void;
    handleResetStats(payload: any, userId: string): void;
    private startWatchingDb;
    onModuleDestroy(): Promise<void>;
}
