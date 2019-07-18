
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
  eventsMeta:any = '';
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

  ionViewDidEnter() {
    this.storage.get('auth-token').then((value) => {
      
      let Bearer = value;

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

        this.http.get(SERVER_URL+"api/profile", this.httpOptions)
        .subscribe((result: any) => {
          
          this.profile = result.data;
          //get next events
          console.log('profile');
          console.log(this.profile);
          // this.http.get(this.profile.rels.events.href, httpOptions)
          // .subscribe((result: any) => {
          //   console.log('eventos');
          //   console.log(result.data);
          // });

        });

        this.http.get(SERVER_URL+"api/events/next?per_page=3&page="+this.page, this.httpOptions)
        .subscribe((result: any) => {
          if(result){
            console.log(result);
            this.events = result.data;
            this.eventsMeta = result.meta;
            console.log(this.eventsMeta);
            this.page++;
          } 
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
  goToBookingStatus(){
    this.router.navigate(['/step-on-waiting']);
  }
  goToEvents() {
    this.router.navigate(['/events']);
  }
  goToEvent(id:number) {
    this.router.navigate(['/events/'+id]);
  }

}
