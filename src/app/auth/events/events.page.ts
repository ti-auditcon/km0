
//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  nextEvents:any = '';
  pastEvents:any = '';
  nextEventsPage:any = 1;
  nextEventsMeta:any;
  pastEventsPage:any = 1;
  pastEventsMeta:any;
  httpOptions:any;
  hasNotifications:boolean;
  reActiveInfinite: any;

  public page = 1;

  constructor(

    private router: Router,
    private storage: Storage,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if(this.reActiveInfinite){
      this.reActiveInfinite.target.disabled = false;
     }
    this.pastEventsPage = 1;
    this.nextEventsPage = 1;

    this.storage.get('auth-token').then((value) => {
      
      let Bearer = value;

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

        //get next events
        this.http.get(SERVER_URL+"api/events/next?per_page=10&page="+this.nextEventsPage, this.httpOptions)
        .subscribe((result: any) => {
          if(result){
            console.log(result);
            this.nextEvents = result.data;
            this.nextEventsMeta = result.meta ;
            this.nextEventsPage++;
          } 
        });

        this.http.get(SERVER_URL+"api/events/past?per_page=3&page="+this.pastEventsPage, this.httpOptions)
        .subscribe((result: any) => {
          if(result){
            console.log(result);
            this.pastEvents = result.data;
            this.pastEventsMeta = result.meta;
            this.pastEventsPage++;
          } 
        });

        this.http.get(SERVER_URL+"api/profile/notifications/has", this.httpOptions)
        .subscribe((result: any) => {
          console.log(result);
          this.hasNotifications = result;
        });

    });
  }

  goToEventDetail(){
    this.router.navigate(['/event-detail']);
  }

  goToEvent(id:number) {
    this.router.navigate(['/events/'+id]);
  }

  loadMoreEvents(infiniteScrollEvent){
    console.log('entre events');

    this.http.get(SERVER_URL+"api/events/next?per_page=3&page="+this.nextEventsPage, this.httpOptions)
        .subscribe((result: any) => {
          this.nextEvents = this.nextEvents.concat(result.data);
          console.log("total pages: "+result.meta.pagination.total_pages);
          if(this.nextEventsPage <= result.meta.pagination.total_pages ){
            this.nextEventsPage++;
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

  loadMorePastEvents(infiniteScrollEvent){
    this.reActiveInfinite = infiniteScrollEvent;
    console.log('entre events');

    this.http.get(SERVER_URL+"api/events/past?per_page=3&page="+this.pastEventsPage, this.httpOptions)
      .subscribe((result: any) => {
        this.pastEvents = this.pastEvents.concat(result.data);
        console.log("total pages: "+result.meta.pagination.total_pages);
        if(this.pastEventsPage <= result.meta.pagination.total_pages ){
          this.pastEventsPage++;
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
}
