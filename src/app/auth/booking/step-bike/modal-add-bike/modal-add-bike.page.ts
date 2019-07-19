import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-bike',
  templateUrl: './modal-add-bike.page.html',
  styleUrls: ['./modal-add-bike.page.scss'],
})
export class ModalAddBikePage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
