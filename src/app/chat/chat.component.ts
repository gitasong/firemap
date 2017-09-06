import { Component, OnInit } from '@angular/core';
import { DsService } from '../ds.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [DsService]
})
export class ChatComponent implements OnInit {
  title = 'deepChat';
  username;
  text;
  chats;
  chatArray = [];

  constructor(
    private ds: DsService
  ) {}

  ngOnInit() {
    // Get username from
    // window prompt and use 'anonymous' for
    // null or invalid response
    const defaultUsername = 'anonymous';
    const username = window.prompt('Please enter your username', defaultUsername);

    this.username = username || defaultUsername
    // Login without credentials
    this.ds.login(null, this.loginHandler);

    this.chats = this.ds.getList('chats');

    this.chats.on('entry-added', recordName => {

      this.ds.getRecord( recordName ).whenReady( record => {

        record.subscribe( (data) => {
          if(data.username && data.text) {
            // Update bindable property
            this.chatArray.push(data);
          }
        }, true );

      });
    })
  }

  loginHandler(success, data) {
    console.log('logged in', success, data);
  }

  addChat() {

    const recordName = 'chat/' + this.ds.dsInstance.getUid();

    const chatRecord = this.ds.getRecord(recordName);
    chatRecord.set({username: this.username, text: this.text});
    this.text = '';
    // Update the chats list
    this.chats.addEntry(recordName);
  }



}
