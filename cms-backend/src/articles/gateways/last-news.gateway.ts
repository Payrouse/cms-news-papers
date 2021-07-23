import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/last-news' })
export class LastNewsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('last_news')
  listenLastNews(
    client: any,
    payload: any,
    @ConnectedSocket() socket: Socket,
  ): string {
    socket.emit('last_news', { name: 'last_news' }, (data) =>
      console.log(data),
    );
    return 'Hello world!';
  }
}
