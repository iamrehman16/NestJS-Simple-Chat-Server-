import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    buildMessage(sender: string, text: string){
        return {
            from: sender,
            message:text,
            timestamp: new Date().toISOString(),
        };
    }
}
