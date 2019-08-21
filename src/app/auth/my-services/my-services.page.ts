
//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.page.html',
  styleUrls: ['./my-services.page.scss'],
})
export class MyServicesPage implements OnInit {

  public page:number;
  public httpOptions:any;
  public orders:any;

  constructor(
    private router: Router,
    private storage: Storage,

    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.page = 1
    this.storage.get('auth-token').then((value) => {
      
      let Bearer = value;

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};


        this.http.get(SERVER_URL+"api/orders-finalized", this.httpOptions)
        .subscribe((result: any) => {
            this.orders = result.data;
            console.log('ordenes antiguas : '+this.orders);
        });

    });
  }
  
  // goToServiceDetail() {
  //   this.router.navigate(['/profile/services/1']);
  // }

  goToOrder(id:number){
    this.router.navigate(['/orders/'+id]);
  }

}
