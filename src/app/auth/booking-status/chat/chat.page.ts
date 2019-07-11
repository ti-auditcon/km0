import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

  @ViewChild('content') content: IonContent;

  constructor(
    private router: Router
  ) { }

  ionViewDidEnter() {
    let that = this;
    this.content.scrollToBottom(200);
  }

}
