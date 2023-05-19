import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Viszater } from './viszater';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public message$: BehaviorSubject<Viszater> = new BehaviorSubject({} as Viszater);
  constructor() {}

  socket = io('http://localhost:4444');

  public sendMessage(message: any) {
    console.log('sendMessage: ', message)
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
