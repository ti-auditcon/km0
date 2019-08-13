//env
import { environment, SERVER_URL, API_KEY} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { HttpClient,HttpHeaders } from '@angular/common/http';
//model
import { Service } from '../../../models/service.model';
import { Bike } from '../../../models/bike.model';

@Component({
  selector: 'app-step-pay',
  templateUrl: './step-pay.page.html',
  styleUrls: ['./step-pay.page.scss'],
})
export class StepPayPage implements OnInit {
  public services:Array<Service>;
  public bike:Bike;
  public total:number;

  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient
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

  pay() {
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
                  //   console.log(JSON.parse(result));
                 },
                 (err) => {
                   console.log('error refrersh 401:'+JSON.stringify(err));
                   this.router.navigate(['dashboard']);
                 }
               );
      // });
    })

  }
  
}
