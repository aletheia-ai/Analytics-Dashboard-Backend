import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor() {}
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('client init');
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
}
