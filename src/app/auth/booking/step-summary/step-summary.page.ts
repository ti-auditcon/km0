import { environment, SERVER_URL, API_KEY} from '../../../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { ModalController } from '@ionic/angular';
import { ModalInfoPricePage } from './modal-info-price/modal-info-price.page';
import { HttpClient,HttpHeaders } from '@angular/common/http';

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
  public discount:number = 0 ;
  public discountValue:number = 0 ;

  constructor(
    private router: Router,
    private storage: Storage,
    public modalController: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {

    this.storage.get('bike').then((value) => {
      this.bike = value;
      console.log(this.bike);
    });

    this.storage.get('discount').then((value) => {
      this.discount = value;
      console.log('descuento: '+this.discount);
    });

    this.storage.get('services').then((value) => {
      this.services = value;
      console.log(this.services);
      this.total = this.services.map(item => +item.value).reduce((prev, next) => prev + next);
      this.discountValue = this.total*(this.discount/100);
    });


    
    
  }

  async infoPriceModal() {
    const modal = await this.modalController.create({
      component: ModalInfoPricePage
    });
    return await modal.present();
  }

  goToPay() {
    this.storage.get('auth-token').then(value => {

      let Bearer = value;

      let data=JSON.stringify({
        bike_id: this.bike.id,
        amount: this.total,
        services: this.services
      });

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer,//updated
          'Content-Type': 'application/json', //updated
        })};
      // return new Promise((resolve, reject) => {
        this.http.post(SERVER_URL+"/api/orders",data, httpOptions)
             .subscribe(
                 (result: any) => {
                     console.log('success refresh 200');
                     console.log('Resultados: '+JSON.stringify(result.data));
                     console.log('id: '+JSON.stringify(result.data.id));
                     this.router.navigate(['orders/'+result.data.id+'/flow']);
                 },
                 (err) => {
                   console.log('error refrersh 401:'+JSON.stringify(err));
                   this.router.navigate(['dashboard']);
                 }
               );
      // });
    });
    
    //this.router.navigate(['/step-pay']);
  }

}
