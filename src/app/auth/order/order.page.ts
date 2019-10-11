
//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  httpOptions:any;
  order:any;
  services:any;
  spares:any;
  hola:boolean = true;
  hasNotifications:boolean;

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  doRefresh(event) {
    this.ionViewDidEnter();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  ionViewDidEnter() {

    this.storage.get('auth-token').then((value) => {

      let Bearer = value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"api/orders/"+id, this.httpOptions)
      .subscribe((result: any) => {
        console.log(result.data);
        // if(result.data.status['id'] == 1){
        //   this.router.navigate(['/orders/'+id+'/flow']);
        // }
        this.order = result.data;
      });

      this.http.get(SERVER_URL+"api/orders/"+id+"/services", this.httpOptions)
      .subscribe((result: any) => {
        console.log(result.data);
        this.services = result.data;
      });

      this.http.get(SERVER_URL+"api/orders/"+id+"/spares", this.httpOptions)
      .subscribe((result: any) => {
        console.log(result.data);
        this.spares = result.data;
        // console.log('Tipo: '+typeof(this.spares));
      });

      this.http.get(SERVER_URL+"api/profile/notifications/has", this.httpOptions)
      .subscribe((result: any) => {
        console.log(result);
        this.hasNotifications = result;
      });

    });
  }

  approveOrder() {
    this.storage.get('auth-token').then((value) => {

      let Bearer = value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"api/orders/"+id+"/approve", this.httpOptions)
      .subscribe((result: any) => {
        console.log(result.data);
        this.services = result.data;
        this.ionViewDidEnter();
      });

    });

  }

  review() {


    this.storage.get('auth-token').then((value) => {

      let Bearer = value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"api/orders/"+id+"/review", this.httpOptions)
      .subscribe((result: any) => {
        console.log(result.data);
        this.services = result.data;
        this.router.navigate(['/']);
      });

    });

  }

  goToChat(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('entre:'+id);
    this.router.navigate(['/orders/'+id+'/chat']);
  }

  payReserve(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.router.navigate(['/orders/'+id+'/flow']);
  }
  delete(){
    
    this.storage.get('auth-token').then((value) => {

      let Bearer = value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.delete(SERVER_URL+"api/orders/"+id, this.httpOptions)
      .subscribe((result: any) => {
        this.router.navigate(['/']);
      });

    });
  }
}
