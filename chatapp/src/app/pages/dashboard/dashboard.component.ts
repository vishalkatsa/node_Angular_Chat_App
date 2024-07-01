import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  UserLoginData: any;
  Conversation: any = [];
  Messages: any = [];
  message: string = '';
  users: any = [];
  myconversationUser: any = {};
  myconversationId: string = '';

  socket: any;
  Typing: string = '';

  constructor(private http: HttpService) { }

  ngOnInit() {
    // Initialize component
    this.UserLoginData = JSON.parse(localStorage.getItem('UserLoginData'));
    this.fetchConversation();
    this.fetchUsers();
    ////////////////////////////// Socket Start ////////////////////////////////////////

    this.socket = io('http://localhost:8090');

    this.socket.emit('addUser', this.UserLoginData?._id);
    this.socket.on('getUsers', (users: any) => {
      console.log('Active Users', users);

    });
    this.socket.on('getMessage', ({ message, senderId, receiverId, conversationId }) => {
      console.log('new this.users', message);
      this.Messages.push({ message: message });
      console.log(this.Messages);

    })
    this.socket.on('typing-commit', ({ senderId, receiverId, conversationId }) => {

      this.Typing = receiverId;
      setTimeout(() => {
        this.Typing = '';
        }, 500);


    })
  }
  /////////  Typing Handler   ///////////

  TypingHandler() {
    this.socket.emit('typing', {
      senderId: this.UserLoginData._id,
      receiverId: this.myconversationUser.reseiverId,
      conversationId: this.Messages[0]?.conversationId ? this.Messages[0]?.conversationId : this.myconversationId
    })
  }

  ////////////////////////////// Socket End ////////////////////////////////////////


  fetchConversation() {
    this.http.get(`Conversation/GetConversation/${this.UserLoginData?._id}`).subscribe((data) => {
      this.Conversation = data?.conversationUserData;
    });
  }

  fetchUsers() {
    this.http.get(`auth/getUsers`).subscribe((data) => {
      this.users = data?.userData;
    });
  }

  fetchMessage(conversation: any) {
    // Fetch messages for the selected conversation
    this.myconversationUser = conversation.user;
    this.myconversationId = conversation.conversationId;
    this.http.get(`Message/GetMessage/${conversation.conversationId}`).subscribe((data) => {
      this.Messages = data?.messageuserData;
    });
  }

  newConversation(receiverId: any) {
    // Create a new conversation
    this.http.post(`Conversation/createConversation/`, { senderId: this.UserLoginData?._id, reseiverId: receiverId }).subscribe((data) => {
      if (data.message === "Conversation Create Successfully") {
        this.fetchConversation();
      }
    });
  }

  SendMessage() {
    // Send message
    console.log(this.myconversationUser.reseiverId);
    console.log(this.myconversationId);
    ////////////////////////////// Socket Start ////////////////////////////////////////
    this.socket.emit('sendMessage', {
      message: this.message,
      senderId: this.UserLoginData._id,
      receiverId: this.myconversationUser.reseiverId,
      conversationId: this.Messages[0]?.conversationId ? this.Messages[0]?.conversationId : this.myconversationId
    })
    ////////////////////////////// Socket End ////////////////////////////////////////

    this.http.post(`Message/createMessage`, {
      message: this.message,
      senderId: this.UserLoginData._id,
      conversationId: this.Messages[0]?.conversationId ? this.Messages[0]?.conversationId : this.myconversationId
    }).subscribe((data) => {
      if (data.message === "Message Send Successfully") {
        let conversationId = data?.newMessage?.conversationId;
        this.fetchMessage2(conversationId);
        this.message = '';
      }
    });

  }

  fetchMessage2(conversationId: any) {
    this.http.get(`Message/GetMessage/${conversationId}`).subscribe((data) => {
      this.Messages = data?.messageuserData;
    });
  }
  conversationExists(receiverId: string): boolean {
    return this.Conversation.some(conversation => conversation.user.reseiverId === receiverId);
  }



}
