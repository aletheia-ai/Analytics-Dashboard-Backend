import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

import { ChangeStream } from 'mongodb';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  private changeStream: ChangeStream | null = null;

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.startWatchingDb();
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('connect');
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect');
  }
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    this.server.to(room).emit('joinedRoom', { room });
  }
  handlePepleStats(payload: any, userId: string) {
    this.server.emit('people-stats', payload);
  }

  handleResetStats(payload: any, userId: string) {
    this.server.emit('reset-stats', payload);
  }
  private startWatchingDb() {
    this.changeStream = this.connection.collection('product_stats').watch(
      [
        {
          $match: {
            'fullDocument.cameraId': 'all',
            'fullDocument.range': 'all',
            operationType: 'update',
          },
        },
      ],
      { fullDocument: 'updateLookup' }
    );

    this.changeStream.on('change', (change) => {
      if (change.operationType === 'update' && change.fullDocument) {
        if (change.fullDocument.source === 'from-cron') {
          this.handleResetStats(change.fullDocument.data, '1');
        }
      }
    });

    this.changeStream.on('error', (err) => {
      console.error('❌ Change Stream Error:', err);
      this.changeStream = null;
    });
  }
  async onModuleDestroy() {
    await this.changeStream?.close();
  }
}
