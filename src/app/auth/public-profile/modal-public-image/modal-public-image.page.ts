import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-public-image',
  templateUrl: './modal-public-image.page.html',
  styleUrls: ['./modal-public-image.page.scss'],
})
export class ModalPublicImagePage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
