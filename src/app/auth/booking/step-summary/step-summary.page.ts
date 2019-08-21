import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { ModalController } from '@ionic/angular';
import { ModalInfoPricePage } from './modal-info-price/modal-info-price.page';
//model
import { Service } from '../../../models/service.model';
import { Bike } from '../../../models/bike.model';

@Component({
  selector: 'app-step-summary',
  templateUrl: './step-summary.page.html',
  styleUrls: ['./step-summary.page.scss'],
})
export class StepSummaryPage implements OnInit {

  public services:Array<Service>;
  public bike:Bike;
  public total:number;

  constructor(
    private router: Router,
    private storage: Storage,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {

    this.storage.get('bike').then((value) => {
      this.bike = value;
      console.log(this.bike);
    });

    this.storage.get('services').then((value) => {
      this.services = value;
      console.log(this.services);
      this.total = this.services.map(item => +item.value).reduce((prev, next) => prev + next);

    });


    
    
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
