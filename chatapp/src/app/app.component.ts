import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import io from 'socket.io-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  socket: any;
  message: string = '';
  room:any = '';
  SocketId:any = '';

  Realmessage:any = '';
 
  constructor() {
  };

  ngOnInit() {
 
  }

}
