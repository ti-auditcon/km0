
//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  profile:any = '';
  events:any = '';
  orders:any = '';
  eventsMeta:any = '';
  ordersMeta:any = '';
  httpOptions:any;
  public page = 1;

  constructor(
    private router: Router,
    private storage: Storage,
    private http:HttpClient
  ) { }

  ngOnInit() {
    console.log('entre a dashboard');
  }
  doRefresh(event) {
    this.ionViewDidEnter();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  ionViewDidEnter() {
    this.page = 1
    this.storage.get('auth-token').then((value) => {
      
      let Bearer = value;

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};
        //profile
        this.http.get(SERVER_URL+"api/profile", this.httpOptions)
        .subscribe((result: any) => {
          
          this.profile = result.data;

        });

        this.http.get(SERVER_URL+"api/events/next?per_page=3&page="+this.page, this.httpOptions)
        .subscribe((result: any) => {

            this.events = result.data;
            this.page++;

        });

        this.http.get(SERVER_URL+"api/orders", this.httpOptions)
        .subscribe((result: any) => {
            this.orders = result.data;


        });

    });
  }

  loadMoreEvents(infiniteScrollEvent){
    console.log('entre');
    this.http.get(SERVER_URL+"api/events/next?per_page=3&page="+this.page, this.httpOptions)
        .subscribe((result: any) => {
          console.log('mas eventos');
          console.log('page:'+this.page);
          this.events = this.events.concat(result.data);
          if(this.page < result.meta.pagination.total_pages ){
            this.page++;
            infiniteScrollEvent.target.complete();
          } else {
            console.log('no hay mas');
            infiniteScrollEvent.target.disabled = true;
          }

        },
        err => {
          console.log('error eventos');
        });
  }

  goToBooking(){
    this.router.navigate(['/step-bike']);
  }
  goToOrder(id:number){
    this.router.navigate(['/orders/'+id]);
  }
  goToEvents() {
    this.router.navigate(['/events']);
  }
  goToEvent(id:number) {
    this.router.navigate(['/events/'+id]);
  }

}
