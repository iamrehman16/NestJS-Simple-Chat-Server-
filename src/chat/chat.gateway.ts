import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors:{
    origin:"*",
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer()
  server:Server;

  constructor(private readonly chatservice:ChatService){}

  afterInit(server:Server){
    console.log("Websocket Server Initialized!");
  }

  handleConnection(client: Socket) {
      console.log("Client connected: " , client.id);
      client.emit("message",this.chatservice.buildMessage("server","Welcome!"));
  }

  handleDisconnect(client: Socket) {
      console.log("Client disconnected", client.id);
  }

  @SubscribeMessage("sendMessage")
  handleMessage(
    @ConnectedSocket() client:Socket,
    @MessageBody() payload: {text:string},
  ){
    console.log(payload.text);
    const message = this.chatservice.buildMessage("Server",payload.text);
    this.server.emit("message",message);
  }
}
