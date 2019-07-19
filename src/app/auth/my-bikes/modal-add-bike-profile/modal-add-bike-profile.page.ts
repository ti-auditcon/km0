import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-bike-profile',
  templateUrl: './modal-add-bike-profile.page.html',
  styleUrls: ['./modal-add-bike-profile.page.scss'],
})
export class ModalAddBikeProfilePage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
