import { Component } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  newMessage = '';
  messageList: string[] = ['cat', 'dog'];

  constructor(private chatService: WebsocketService){}
  label!: any[];
  data!: any[];



  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message: any) => {
      this.messageList.push(message);

    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
