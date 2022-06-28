import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { Chat } from '../chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  socket = io('https://test-ws.bonbon.co.id');
  message: any;
  messageArray = [];
  login: boolean = true;

  chatModel = new Chat('', '', '')
  chatting: string = '';
  joinChat: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('session_fullname') != null && localStorage.getItem('session_callname') != null) {
      this.login = false;
      this.chatModel.fullName = localStorage.getItem('session_fullname')?.toString()!
      this.chatModel.callName = localStorage.getItem('session_callname')?.toString()!
    }

    this.socket.emit('findAllMessage', {}, (response: any) => {
      this.messageArray = response;
      this.message = response;
      //console.log(this.message)
    })

    this.socket.on('message', (message: any) => {
      this.socket.emit('findAllMessage', {}, (response: any) => {
        this.message = response;
      })
    })
  }

  onSubmit() {
    localStorage.setItem('session_fullname', this.chatModel.fullName)
    localStorage.setItem('session_callname', this.chatModel.callName)
    this.socket.emit('join', { name: this.chatModel.fullName }, () => {
      this.joinChat = true;
    })
    window.location.reload()
  }

  onSubmitChat() {
    const now = new Date();
    this.socket.emit('createMessage', { text: this.chatting, name: this.chatModel.callName, fullName: this.chatModel.fullName, time: now.toLocaleString() }, () => {
      this.chatting = ''
    })
  }

}
