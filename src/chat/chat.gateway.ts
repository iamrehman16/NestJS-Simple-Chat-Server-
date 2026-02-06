import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';

//create gateway with cors allowed
@WebSocketGateway({
  cors:{
    origin:"*",
  }
})//implement OnGatewayConnection and OnGatewayDiconnect
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{

  //create the socketserver
  @WebSocketServer()
  server:Server;

  //constructor with service injection and empty body
  constructor(private readonly chatservice:ChatService){}


  //init hookfunction runs on websocket initialization
  afterInit(server:Server){
    console.log("Websocket Server Initialized!");
  }

  //handleConnection hook function runs on individual client connection
  handleConnection(client: Socket) {
      console.log("Client connected: " , client.id);
      //send message to sender itself only
      client.emit("message",this.chatservice.buildMessage("server","Welcome!"));
  }

  //runs on individual client connection
  handleDisconnect(client: Socket) {
      console.log("Client disconnected", client.id);
  }

  //user defined function listening for 'sendMessage' event to accept incoming messages
  @SubscribeMessage("sendMessage")
  handleMessage(
    @ConnectedSocket() client:Socket, //extract client socket from event object
    @MessageBody() payload: {text:string}, //extract payload from connection object
  ){
    console.log(payload.text);
    const message = this.chatservice.buildMessage("Server",payload.text);
    //sends message to every clientn(sender included)
    this.server.emit("message",message);
  }
}
