import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalAddBikePage } from './modal-add-bike/modal-add-bike.page';
import { ModalAddPiecePage } from './modal-add-piece/modal-add-piece.page';
import { ModalChangeOfficePage } from './modal-change-office/modal-change-office.page';

@Component({
  selector: 'app-step-bike',
  templateUrl: './step-bike.page.html',
  styleUrls: ['./step-bike.page.scss'],
})
export class StepBikePage implements OnInit {

  constructor(
    private router: Router,
    public modalController: ModalController
  ) { }

  ngOnInit() {}

  async addBicicleModal() {
    const modal = await this.modalController.create({
      component: ModalAddBikePage
    });
    return await modal.present();
  }

  async addPieceModal() {
    const modal = await this.modalController.create({
      component: ModalAddPiecePage
    });
    return await modal.present();
  }

  async changeOfficeModal() {
    const modal = await this.modalController.create({
      component: ModalChangeOfficePage
    });
    return await modal.present();
  }

  goToService(){
    this.router.navigate(['/step-service']);
  }

}
