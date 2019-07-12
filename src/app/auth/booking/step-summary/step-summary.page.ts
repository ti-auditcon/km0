import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalInfoPricePage } from './modal-info-price/modal-info-price.page';

@Component({
  selector: 'app-step-summary',
  templateUrl: './step-summary.page.html',
  styleUrls: ['./step-summary.page.scss'],
})
export class StepSummaryPage implements OnInit {

  constructor(
    private router: Router,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async infoPriceModal() {
    const modal = await this.modalController.create({
      component: ModalInfoPricePage
    });
    return await modal.present();
  }

  goToPay() {
    this.router.navigate(['/step-pay']);
  }

}
