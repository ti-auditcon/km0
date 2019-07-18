import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPublicImagePage } from './modal-public-image/modal-public-image.page';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.page.html',
  styleUrls: ['./public-profile.page.scss'],
})
export class PublicProfilePage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async viewPhoto(){
    const modal = await this.modalController.create({
      component: ModalPublicImagePage
    });
    return await modal.present();
  }

}
