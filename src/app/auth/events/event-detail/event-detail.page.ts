import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalImagePage } from './modal-image/modal-image.page'

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  images = [
    {
      url: 'assets/img/event-default.jpg'
    },
    {
      url: 'assets/img/event-default.jpg'
    },
    {
      url: 'assets/img/event-default.jpg'
    },
    {
      url: 'assets/img/event-default.jpg'
    },
    {
      url: 'assets/img/event-default.jpg'
    },
    {
      url: 'assets/img/event-default.jpg'
    },
  ]

  constructor(
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async openImage() {
    const modal = await this.modalController.create({
      component: ModalImagePage
    });
    return await modal.present();
  }

}
