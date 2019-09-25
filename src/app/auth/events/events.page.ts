
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
  nextEventsPage:any = '';
  pastEventsPage:any = '';
  httpOptions:any;
  hasNotifications:boolean;

  public page = 1;

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

        //get next events
        this.http.get(SERVER_URL+"api/events/next?per_page=3&page="+this.nextEventsPage, this.httpOptions)
        .subscribe((result: any) => {
          this.nextEvents = result.data;
          console.log(this.nextEvents);
        });

        this.http.get(SERVER_URL+"api/events/past?per_page=3&page="+this.pastEventsPage, this.httpOptions)
        .subscribe((result: any) => {
          if(result){
            console.log(result);
            this.pastEvents = result.data;
            console.log(this.pastEvents);
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

}
